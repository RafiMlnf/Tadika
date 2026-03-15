export interface Member {
  id: string;
  name: string;
  role: string;
  quote: string;
  joinYear: number;
  image: string;
  imageScale?: number; // Optional zoom level for the physical image tag (e.g. 1.2 for 120% zoom)
  imageOffsetY?: string; // Untuk geser posisi fokus gambar sblm di zoom (isi dgn 'top', 'bottom', atau persentase spt '20%')
  bio: string;
  spotifyTrackId?: string; // Spotify track ID untuk lagu favorit
  favSong?: { // Lagu favorit via YouTube (audio only player)
    youtubeId: string;   // ID video YouTube (dari link, contoh: 'dQw4w9WgXcQ')
    title: string;       // Judul lagu
    artist: string;      // Nama artis
    startAt?: number;    // Mulai dari detik ke berapa (default: 0)
  };
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
    id: 'hafiz',
    name: 'Hafiz',
    role: 'Member',
    quote: 'Pria ambisius.',
    joinYear: 2023,
    image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/f_auto,q_auto/v1773515971/hafiz_qnczjq.heic',
    imageScale: 1.7,
    bio: 'Pria ambisius, lu dapet hasil dari lu belajar selama ini respect, tapi jokes lu anj.',
    stats: { trips: 5, photos: 120 },
    socials: { instagram: '@hafiz' }
  },
  {
    id: 'mikael',
    name: 'Mikael',
    role: 'Member',
    quote: '"Boleh-boleh ayo."',
    joinYear: 2023,
    image: '',
    bio: 'Depan PC mulu.',
    stats: { trips: 8, photos: 90 },
    socials: { instagram: '@mikael' }
  },
  {
    id: 'dito',
    name: 'Dito',
    role: 'Member',
    quote: '"Yang penting makan enak."',
    joinYear: 2024,
    image: '',
    bio: 'Selalu mementingkan kuliner di setiap destinasi.',
    stats: { trips: 4, photos: 50 },
    socials: { instagram: '@dito' }
  },
  {
    id: 'rafi',
    name: 'Rafi',
    role: 'Event Planner',
    quote: '"Keren bgt jir gw"',
    joinYear: 2022,
    image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773516975/rafi_zyj2kl.jpg',
    imageScale: 1.7,     // <--- TAMBAHKAN INI. 1.0 (Normal), 1.2 (Zoom 120%), 1.5 (Zoom 150%) dst.
    bio: 'Orang di balik sebagian besar foto bagus di website ini...',
    stats: { trips: 14, photos: 1250 },
    socials: { instagram: '@rafi.shoots' }
  },
  {
    id: 'gilar',
    name: 'Gilar',
    role: 'Member',
    quote: '"Gass terus."',
    joinYear: 2023,
    image: '',
    bio: 'Pemberi semangat kalau rombongan sudah mulai capek.',
    stats: { trips: 7, photos: 210 },
    socials: { instagram: '@gilar' }
  },
  {
    id: 'ricky',
    name: 'Ricky',
    role: 'Member',
    quote: '"Tunggu dulu, foto bentar."',
    joinYear: 2023,
    image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/ricky_c8uiry.jpg',
    imageScale: 1.7,
    imageOffsetY: 'bottom',
    bio: 'Pendamping fotografer dan hobi foto pakai film.',
    stats: { trips: 6, photos: 310 },
    socials: { instagram: '@ricky' }
  },
  {
    id: 'hadi',
    name: 'Hadi',
    role: 'Member',
    quote: '"Jam berapa ngumpulnya?"',
    joinYear: 2022,
    image: '',
    bio: 'Sering menanyakan jadwal namun sering kali juga on-time.',
    stats: { trips: 11, photos: 100 },
    socials: { instagram: '@hadi' }
  },
  {
    id: 'dzaki',
    name: 'Dzaki',
    role: 'Member',
    quote: '"Santuy aja lah."',
    joinYear: 2024,
    image: '',
    bio: 'Paling tenang saat nyasar atau ada masalah di jalan.',
    stats: { trips: 3, photos: 45 },
    socials: { instagram: '@dzaki' }
  },
  {
    id: 'daffa',
    name: 'Daffa',
    role: 'Member',
    quote: '"Cari WiFi di mana nih?"',
    joinYear: 2022,
    image: '',
    bio: 'Selalu butuh sinyal dan koneksi, tukang sebar hotspot.',
    stats: { trips: 13, photos: 400 },
    socials: { instagram: '@daffa' }
  },
  {
    id: 'farhan',
    name: 'Farhan',
    role: 'Member',
    quote: '"Gas aja mumpung cerah."',
    joinYear: 2023,
    image: '',
    bio: 'Penggemar kegiatan outdoor dan selalu sedia peralatan camping.',
    stats: { trips: 9, photos: 150 },
    socials: { instagram: '@farhan' }
  },
  {
    id: 'dimas',
    name: 'Dimas',
    role: 'The Entertainer',
    quote: '"Bro, dengerin playlist gue nih."',
    joinYear: 2022,
    image: '',
    bio: 'Tukang setel musik di mobil dan pencair suasana saat trip mulai garing. Selalu bawa speaker Bluetooth ke mana-mana dan stok jokes bapack-bapack.',
    stats: { trips: 12, photos: 180 },
    socials: { instagram: '@dimas.vibes' }
  },
  {
    id: 'raka',
    name: 'Raka',
    role: 'Member',
    quote: '"Gue yang nyetir aja."',
    joinYear: 2024,
    image: '',
    bio: 'Supir andalan saat perjalanan jauh. Sangat hafal rute.',
    stats: { trips: 5, photos: 60 },
    socials: { instagram: '@raka' }
  },
  {
    id: 'akbar',
    name: 'Akbar',
    role: 'Member',
    quote: '"Udah pesan tiket blm?"',
    joinYear: 2023,
    image: '',
    bio: 'Urusan logistik tiket dan penginapan, Akbar yang handle.',
    stats: { trips: 8, photos: 85 },
    socials: { instagram: '@akbar' }
  },
  {
    id: 'dafa',
    name: 'Dafa',
    role: 'Member',
    quote: '"Ayo mampir beli kopi bentar."',
    joinYear: 2022,
    image: '',
    bio: 'Paling sering butuh istirahat ngopi dalam perjalanan.',
    stats: { trips: 10, photos: 250 },
    socials: { instagram: '@dafa' }
  },
  {
    id: 'arifin',
    name: 'Arifin',
    role: 'Member',
    quote: '"Gampang itu mah."',
    joinYear: 2024,
    image: '',
    bio: 'Tukang ngide buat masuk ke rute yang nyeleneh.',
    stats: { trips: 4, photos: 30 },
    socials: { instagram: '@arifin' }
  },
  {
    id: 'navin',
    name: 'Navin',
    role: 'Member',
    quote: '"Udah nyampe belom bos?"',
    joinYear: 2023,
    image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg',
    bio: 'Paling ngga sabaran kalau di jalan tol.',
    stats: { trips: 7, photos: 110 },
    socials: { instagram: '@navin' }
  },
  {
    id: 'zidan',
    name: 'Zidan',
    role: 'The Navigator',
    quote: '"Multitalent."',
    joinYear: 2022,
    image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773583031/zidan_ig2cul.png',
    bio: 'Lu serba bisa, orang paling fleksibel. Ty bet udah mau ini itu, mvp parah. btw, TOMBOLLLLL.',
    stats: { trips: 15, photos: 420 },
    socials: { instagram: '@zidan_nav' }
  }
];
