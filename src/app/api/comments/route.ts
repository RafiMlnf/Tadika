import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Key prefix biar rapi di Redis
const COMMENTS_KEY = 'tadika:comments';

// GET — ambil semua komentar
export async function GET() {
  try {
    const data = await redis.get<Record<string, any[]>>(COMMENTS_KEY);
    return NextResponse.json(data || {});
  } catch (error) {
    console.error('Error fetching comments from Upstash:', error);
    return NextResponse.json({ error: 'Gagal ngambil data komentar' }, { status: 500 });
  }
}

// POST — kirim komentar baru
export async function POST(req: Request) {
  try {
    const { photoSrc, comment } = await req.json();

    if (!photoSrc || !comment || !comment.name || !comment.text) {
      return NextResponse.json({ error: 'Data ga valid bro' }, { status: 400 });
    }

    // Ambil data lama
    const existing = (await redis.get<Record<string, any[]>>(COMMENTS_KEY)) || {};

    if (!existing[photoSrc]) {
      existing[photoSrc] = [];
    }

    existing[photoSrc].push(comment);

    // Simpen balik ke Upstash
    await redis.set(COMMENTS_KEY, existing);

    return NextResponse.json({ success: true, allComments: existing });
  } catch (error) {
    console.error('Error saving comment to Upstash:', error);
    return NextResponse.json({ error: 'Gagal nyimpen komentar' }, { status: 500 });
  }
}
