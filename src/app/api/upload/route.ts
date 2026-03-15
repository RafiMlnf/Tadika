import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = formData.get('category') as string || 'random';
    const uploader = formData.get('uploader') as string || 'anonymous';
    const title = formData.get('title') as string || 'Untitled';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload directly to Cloudinary via stream handler
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: `tadika-gallery/${category}`,
          resource_type: 'auto' 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const url = (uploadResult as any).secure_url;

    // Save metadata locally to src/data/media.json
    const metaFile = path.join(process.cwd(), 'src', 'data', 'media.json');
    let media = [];
    if (fs.existsSync(metaFile)) {
      media = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    }
    
    const newEntry = {
      id: (uploadResult as any).public_id || Date.now().toString(),
      title,
      category,
      url,
      uploader,
      date: new Date().toISOString().split('T')[0]
    };
    
    media.push(newEntry);
    fs.writeFileSync(metaFile, JSON.stringify(media, null, 2));

    return NextResponse.json({ success: true, url, newEntry });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed: Periksa konfigurasi API Key Cloudinary' }, { status: 500 });
  }
}
