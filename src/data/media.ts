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
        slug: 'pantai',
        name: 'Pantai',
        description: 'Momen seru di pinggir laut',
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        count: 48,
        emoji: '🏖️',
    },
    {
        slug: 'gunung',
        name: 'Gunung',
        description: 'Petualangan hiking dan camping',
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        count: 35,
        emoji: '⛰️',
    },
    {
        slug: 'kota',
        name: 'Kota',
        description: 'Hangout dan jalan-jalan kota',
        coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
        count: 62,
        emoji: '🏙️',
    },
    {
        slug: 'random',
        name: 'Random',
        description: 'Momen-momen tak terduga',
        coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
        count: 89,
        emoji: '🎲',
    },
    {
        slug: 'throwback',
        name: 'Throwback',
        description: 'Foto-foto nostalgia',
        coverImage: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76cb?w=800&q=80',
        count: 27,
        emoji: '📼',
    },
];

export const sampleMedia: MediaItem[] = [
    {
        id: '001',
        title: 'Sunset di Anyer',
        category: 'pantai',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
        uploader: 'rafi',
        date: '2026-01-15',
        type: 'photo',
        aspectRatio: 0.667,
    },
    {
        id: '002',
        title: 'Puncak Semeru',
        category: 'gunung',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
        uploader: 'dani',
        date: '2025-12-20',
        type: 'photo',
        aspectRatio: 1.5,
    },
    {
        id: '003',
        title: 'Nongkrong Cafe',
        category: 'kota',
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80',
        uploader: 'aldi',
        date: '2026-02-10',
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
        category: 'pantai',
        url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80',
        uploader: 'rafi',
        date: '2026-01-15',
        type: 'photo',
        aspectRatio: 1.33,
    },
    {
        id: '006',
        title: 'Camp Fire',
        category: 'gunung',
        url: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1200&q=80',
        uploader: 'budi',
        date: '2025-12-21',
        type: 'photo',
        aspectRatio: 0.667,
    },
    {
        id: '007',
        title: 'Street Food Tour',
        category: 'kota',
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
        uploader: 'aldi',
        date: '2026-02-14',
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
        title: 'Road Trip Anyer',
        location: 'Pantai Anyer, Banten',
        date: '2026-01-15',
        description: 'Weekend seru di pantai Anyer. Berenang, bakar ikan, dan main voli pantai dari pagi sampai sunset.',
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        members: ['Rafi', 'Dani', 'Aldi', 'Maya', 'Budi'],
        photoCount: 48,
    },
    {
        id: 'trip-002',
        title: 'Pendakian Semeru',
        location: 'Gunung Semeru, Jawa Timur',
        date: '2025-12-20',
        description: 'Pendakian 3 hari 2 malam ke puncak Mahameru. Capek tapi worth it banget!',
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        members: ['Rafi', 'Dani', 'Budi', 'Eka'],
        photoCount: 35,
    },
    {
        id: 'trip-003',
        title: 'Jakarta Night Ride',
        location: 'Jakarta Selatan',
        date: '2026-02-10',
        description: 'Naik motor keliling Jakarta malam-malam. Nongkrong di Blok M, terus ke Monas.',
        coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
        members: ['Rafi', 'Aldi', 'Maya', 'Dani', 'Sari', 'Budi'],
        photoCount: 62,
    },
];
