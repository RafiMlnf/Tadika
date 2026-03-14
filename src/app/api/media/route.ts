import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const metaFile = path.join(process.cwd(), 'src', 'data', 'media.json');
    
    if (!fs.existsSync(metaFile)) {
      return NextResponse.json([]); // Return empty array if no files uploaded yet
    }

    const data = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading media.json:', error);
    return NextResponse.json({ error: 'Failed to read media data' }, { status: 500 });
  }
}
