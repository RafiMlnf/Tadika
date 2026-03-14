export interface Member {
  id: string;
  name: string;
  role: string;
  quote: string;
  joinYear: number;
  image: string;
  bio: string;
  stats: {
    trips: number;
    photos: number;
  };
  socials: {
    instagram?: string;
    twitter?: string;
  };
}

export const members: Member[] = [
  {
    id: 'zidan',
    name: 'Zidan',
    role: 'The Navigator',
    quote: '"Jalan terus, nyasar urusan belakangan."',
    joinYear: 2022,
    image: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&q=80',
    bio: 'Zidan adalah orang yang selalu dipersilahkan untuk memegang Google Maps. Spesialis jalan-jalan spontan dan penemu tempat makan hidden gem. Tidak pernah absen dalam trip apapun.',
    stats: { trips: 15, photos: 420 },
    socials: { instagram: '@zidan_nav' }
  },
  {
    id: 'rafi',
    name: 'Rafi',
    role: 'The Photographer',
    quote: '"Bentar, lighting-nya bagus nih."',
    joinYear: 2022,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    bio: 'Orang di balik sebagian besar foto bagus di archive ini. Rafi rela jongkok, tiduran, bahkan manjat pohon demi angle foto terbaik. Sering mengorbankan diri jadi tukang foto keliling.',
    stats: { trips: 14, photos: 1250 },
    socials: { instagram: '@rafi.shoots' }
  },
  {
    id: 'sarah',
    name: 'Sarah',
    role: 'The Planner',
    quote: '"Itinerary udah di Google Docs ya!"',
    joinYear: 2023,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    bio: 'Penyusun jadwal dan bendahara andalan. Kalau bukan karena Sarah, mungkin kita cuma akan wacana bertahun-tahun tanpa eksekusi. Sangat ketat dengan rundown.',
    stats: { trips: 10, photos: 215 },
    socials: { instagram: '@sarah.plans', twitter: '@sarahstwets' }
  },
  {
    id: 'dimas',
    name: 'Dimas',
    role: 'The Entertainer',
    quote: '"Bro, dengerin playlist gue nih."',
    joinYear: 2022,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bio: 'Tukang setel musik di mobil dan pencair suasana saat trip mulai garing. Selalu bawa speaker Bluetooth ke mana-mana dan stok jokes bapack-bapack.',
    stats: { trips: 12, photos: 180 },
    socials: { instagram: '@dimas.vibes' }
  },
  {
    id: 'nisa',
    name: 'Nisa',
    role: 'The Foodie',
    quote: '"Dekat sini ada seblak viral lho!"',
    joinYear: 2024,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    bio: 'Radar makanannya paling tajam. Tugas Nisa adalah memastikan logistik kelompok aman dan semua orang makan enak. Rela jalan jauh demi kuliner lokal.',
    stats: { trips: 6, photos: 305 },
    socials: { instagram: '@nisa.eats' }
  }
];
