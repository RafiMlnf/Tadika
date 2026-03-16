import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Use Cloudinary Search API to find ALL images and videos recursively in tadika-gallery
    const results = await cloudinary.search
      .expression('folder=tadika-gallery/*')
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    // 2. Read local media.json to map custom metadata (uploader name, custom title)
    const metaFile = path.join(process.cwd(), 'src', 'data', 'media.json');
    let localData: any[] = [];
    if (fs.existsSync(metaFile)) {
      localData = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    }
    
    // Create map for fast lookup
    const localMap = new Map();
    localData.forEach(item => {
      localMap.set(item.id, item); // ID is usually the Cloudinary public_id
      localMap.set(item.url, item); // Fallback lookup by URL
    });

    // 3. Merge Cloudinary images/videos with local metadata
    const mappedData = results.resources.map((res: any) => {
      const localInfo = localMap.get(res.public_id) || localMap.get(res.secure_url);
      
      // Extract category from asset_folder (e.g., tadika-gallery/Bandung 1 -> Bandung 1)
      let category = 'Random';
      const folderPath = res.asset_folder || res.folder || '';
      if (folderPath) {
        const parts = folderPath.split('/');
        if (parts.length > 1) category = parts[parts.length - 1];
      } else {
        const parts = res.public_id.split('/');
        if (parts.length > 2) category = parts[parts.length - 2];
      }

      return {
        id: res.public_id,
        title: localInfo?.title || res.filename || 'Untitled',
        category: localInfo?.category || decodeURIComponent(category),
        url: res.secure_url,
        type: res.resource_type, // 'image' or 'video'
        uploader: localInfo?.uploader || 'Cloudinary',
        date: localInfo?.date || res.created_at.split('T')[0],
        width: res.width || localInfo?.width || 0,
        height: res.height || localInfo?.height || 0
      };
    });

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
