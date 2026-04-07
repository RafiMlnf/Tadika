import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

// Map asset_folder / public_id prefix → gallery category name
// Any asset_folder starting with "tadika-gallery/" is a gallery item
// The category is the part after "tadika-gallery/"
const GALLERY_PREFIX = 'tadika-gallery/';

// Folders to exclude from gallery (e.g. profile photos)
const EXCLUDED_FOLDERS = ['Profil', 'Profil/pagepfp'];

export async function GET() {
  try {
    // 1. Fetch ALL images and videos from Cloudinary using Search API
    //    No folder filter — search everything, then filter by asset_folder/public_id
    //    Paginate and search both resource types
    let allResources: any[] = [];
    const seenIds = new Set<string>();

    for (const resourceType of ['image', 'video']) {
      let nextCursor: string | undefined = undefined;
      do {
        const searchQuery = cloudinary.search
          .expression(`resource_type:${resourceType}`)
          .sort_by('created_at', 'desc')
          .max_results(500);

        if (nextCursor) {
          searchQuery.next_cursor(nextCursor);
        }

        const results = await searchQuery.execute();
        for (const res of (results.resources || [])) {
          if (!seenIds.has(res.public_id)) {
            seenIds.add(res.public_id);
            allResources.push(res);
          }
        }
        nextCursor = results.next_cursor;
      } while (nextCursor);
    }

    // 2. Read local media.json to map custom metadata (uploader name, custom title)
    const metaFile = path.join(process.cwd(), 'src', 'data', 'media.json');
    let localData: any[] = [];
    if (fs.existsSync(metaFile)) {
      localData = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    }
    
    // Create map for fast lookup
    const localMap = new Map();
    localData.forEach(item => {
      if (item.id) localMap.set(item.id, item);
      if (item.url) {
        localMap.set(item.url, item);
        const normalizedUrl = item.url.replace(/\/v\d+\//, '/');
        localMap.set(normalizedUrl, item);
      }
    });

    // 3. Filter and map resources
    const mappedData: any[] = [];

    for (const res of allResources) {
      // Determine category from asset_folder or public_id path
      const assetFolder = res.asset_folder || '';
      const publicIdParts = res.public_id.split('/');

      // Skip non-gallery items (profile photos, etc.)
      if (EXCLUDED_FOLDERS.some(f => assetFolder === f || assetFolder.startsWith(f + '/'))) {
        continue;
      }

      // Determine category
      let category = 'Random';

      // Priority 1: asset_folder
      if (assetFolder.startsWith(GALLERY_PREFIX)) {
        category = assetFolder.slice(GALLERY_PREFIX.length);
      }
      // Priority 2: public_id path
      else if (publicIdParts.length > 2 && publicIdParts[0] === 'tadika-gallery') {
        category = publicIdParts.slice(1, -1).join('/');
      }
      // Priority 3: Check local metadata
      else {
        const normalizedResUrl = (res.secure_url || '').replace(/\/v\d+\//, '/');
        const localInfo = localMap.get(res.public_id)
          || localMap.get(res.secure_url)
          || localMap.get(normalizedResUrl);
        if (localInfo?.category) {
          category = localInfo.category;
        } else if (!assetFolder.startsWith(GALLERY_PREFIX) && assetFolder !== '' && !assetFolder.startsWith('tadika-gallery')) {
          // Not a gallery asset at all — skip
          continue;
        }
      }

      // Look up local metadata for extra info
      const normalizedResUrl = (res.secure_url || '').replace(/\/v\d+\//, '/');
      const localInfo = localMap.get(res.public_id)
        || localMap.get(res.secure_url)
        || localMap.get(normalizedResUrl);

      mappedData.push({
        id: res.public_id,
        title: localInfo?.title || res.filename || res.public_id.split('/').pop() || 'Untitled',
        category: localInfo?.category || decodeURIComponent(category),
        url: res.secure_url,
        type: res.resource_type,
        uploader: localInfo?.uploader || 'Cloudinary',
        date: localInfo?.date || (res.created_at ? res.created_at.split('T')[0] : ''),
        width: res.width || localInfo?.width || 0,
        height: res.height || localInfo?.height || 0,
      });
    }

    // Sort by newest first
    mappedData.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Error fetching from Cloudinary:', error);
    
    // Fallback if Cloudinary API fails: return only the ones saved in JSON
    try {
      const metaFile = path.join(process.cwd(), 'src', 'data', 'media.json');
      if (fs.existsSync(metaFile)) {
        return NextResponse.json(JSON.parse(fs.readFileSync(metaFile, 'utf8')));
      }
      return NextResponse.json([]);
    } catch {
      return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
    }
  }
}
