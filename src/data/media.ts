export interface MediaItem {
    id: string;
    title: string;
    category: string;
    url: string;
    thumbnail?: string;
    uploader: string;
    date: string;
    type: 'photo' | 'video';
    aspectRatio?: number; // height/width ratio for masonry
}

export interface GalleryCategory {
    slug: string;
    name: string;
    description: string;
    coverImage: string;
    count: number;
    emoji: string;
}

export const categories: GalleryCategory[] = [
    {
        slug: 'bandung-1',
        name: 'Bandung 1',
        description: 'First trip tadika ke Bandung',
        coverImage: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80',
        count: 84,
        emoji: '🏙️',
    },
    {
        slug: 'pangandaran',
        name: 'Pangandaran',
        description: 'Momen mantai bareng gengs',
        coverImage: '/img/pgdn.jpg',
        count: 126,
        emoji: '🏖️',
    },
    {
        slug: 'puncak-bogor',
        name: 'Puncak Bogor',
        description: 'Vibing akhir tahun di villa Puncak',
        coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
        count: 67,
        emoji: '⛰️',
    },
    {
        slug: 'gunung-putri',
        name: 'Gunung Putri',
        description: 'Light hiking & camping',
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        count: 89,
        emoji: '🏕️',
    },
    {
        slug: 'blok-m',
        name: 'Blok M',
        description: 'City stroll vibes Blok M',
        coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        count: 54,
        emoji: '☕',
    },
    {
        slug: 'lembang',
        name: 'Lembang',
        description: 'One day escape kuliner lokalan',
        coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
        count: 72,
        emoji: '♨️',
    },
    {
        slug: 'throwback',
        name: 'Throwback',
        description: 'Foto jejak masa lalu',
        coverImage: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76cb?w=800&q=80',
        count: 27,
        emoji: '📼',
    },
    {
        slug: 'random',
        name: 'Random',
        description: 'Momen aib & tak terduga',
        coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
        count: 89,
        emoji: '🎲',
    },
];

export const sampleMedia: MediaItem[] = [
    {
        id: '001',
        title: 'Sunset di Pangandaran',
        category: 'pangandaran',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
        uploader: 'rafi',
        date: '2023-07-15',
        type: 'photo',
        aspectRatio: 0.667,
    },
    {
        id: '002',
        title: 'Camp Gunung Putri',
        category: 'gunung-putri',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
        uploader: 'dani',
        date: '2024-04-20',
        type: 'photo',
        aspectRatio: 1.5,
    },
    {
        id: '003',
        title: 'Nongkrong M Bloc',
        category: 'blok-m',
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80',
        uploader: 'aldi',
        date: '2024-08-10',
        type: 'photo',
        aspectRatio: 0.75,
    },
    {
        id: '004',
        title: 'Candid Moment',
        category: 'random',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
        uploader: 'maya',
        date: '2026-01-28',
        type: 'photo',
        aspectRatio: 0.667,
    },
    {
        id: '005',
        title: 'Ombak Besar',
        category: 'pangandaran',
        url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80',
        uploader: 'rafi',
        date: '2023-07-16',
        type: 'photo',
        aspectRatio: 1.33,
    },
    {
        id: '006',
        title: 'Villa Puncak',
        category: 'puncak-bogor',
        url: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1200&q=80',
        uploader: 'budi',
        date: '2023-12-21',
        type: 'photo',
        aspectRatio: 0.667,
    },
    {
        id: '007',
        title: 'Street Food Braga',
        category: 'bandung-1',
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
        uploader: 'aldi',
        date: '2022-03-14',
        type: 'photo',
        aspectRatio: 1.0,
    },
    {
        id: '008',
        title: 'Foto Lama 2022',
        category: 'throwback',
        url: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76cb?w=1200&q=80',
        uploader: 'maya',
        date: '2022-06-10',
        type: 'photo',
        aspectRatio: 0.75,
    },
];

export interface TripEntry {
    id: string;
    title: string;
    location: string;
    date: string;
    description: string;
    coverImage: string;
    members: string[];
    photoCount: number;
}

export const trips: TripEntry[] = [
    {
        id: 'trip-001',
        title: 'Road Trip Pangandaran',
        location: 'Pantai Pangandaran, Jawa Barat',
        date: '2023-07-15',
        description: 'Weekend getaway ke pantai selatan yang pecah banget. Ada snorkeling, chilling liat sunset, plus deep talk rill depan api unggun.',
        coverImage: '/img/pgdn.jpg',
        members: ['Rafi', 'Dani', 'Aldi', 'Maya', 'Budi'],
        photoCount: 126,
    },
    {
        id: 'trip-002',
        title: 'Gunung Putri',
        location: 'Gunung Putri, Lembang',
        date: '2024-04-20',
        description: 'Light hiking plus nge-camp chill sambil stargazing.',
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        members: ['Rafi', 'Dani', 'Budi', 'Eka'],
        photoCount: 89,
    },
    {
        id: 'trip-003',
        title: 'Blok M Stroll',
        location: 'Blok M, Jakarta Selatan',
        date: '2024-08-10',
        description: 'City stroll vibes Blok M. Mulai dari nge-thrift, café hopping estetik, sampai hunting kuliner malem.',
        coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        members: ['Rafi', 'Aldi', 'Maya', 'Dani', 'Sari', 'Budi'],
        photoCount: 54,
    },
];
