export interface Member {
  id: string;
  name: string;
  role: string;
  quote: string;
  joinYear: number;
  image: string;
  imageScale?: number; // Optional zoom level for the physical image tag (e.g. 1.2 for 120% zoom)
  imageOffsetX?: string; // Geser X foto (contoh: '-40%', 'center', 'right')
  imageOffsetY?: string; // Geser Y foto (contoh: '50%', 'center', 'bottom')
  bio: string;
  spotifyTrackId?: string; // Spotify track ID untuk lagu favorit
  favSong?: { // Lagu favorit via YouTube (audio only player)
    youtubeId: string;   // ID video YouTube (dari link, contoh: 'dQw4w9WgXcQ')
    title: string;       // Judul lagu
    artist: string;      // Nama artis
    startAt?: number;    // Mulai dari detik ke berapa (default: 0)
  };
  traits: string[];
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
    traits: ['Ambisius', 'Jokes Gelap'],
    socials: { instagram: '@hafiz' }
  },
  {
    id: 'mikael',
    name: 'Mikael',
    role: 'Member',
    quote: 'Boleh-boleh ayo.',
    joinYear: 2023,
    image: '',
    bio: 'Depan PC mulu.',
    traits: ['PC', 'Malas'],
    socials: { instagram: '@mikaelrivaldo' }
  },
  {
    id: 'dito',
    name: 'Dito',
    role: 'Member',
    quote: '...',
    joinYear: 2024,
    image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773603339/dito_ckdfsm.png',
    imageOffsetY: '25%',
    bio: 'Selalu mementingkan kuliner di setiap destinasi.',
    traits: ['JKT48', 'Wingstop'],
    socials: { instagram: '@dito' }
  },
  {
    id: 'rafi',
    name: 'Rafi',
    role: 'Event Planner',
    quote: 'Keren bgt jir gw',
    joinYear: 2022,
    image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773516975/rafi_zyj2kl.jpg',
    imageScale: 1.7,     // <--- TAMBAHKAN INI. 1.0 (Normal), 1.2 (Zoom 120%), 1.5 (Zoom 150%) dst.
    bio: 'Orang di balik sebagian besar foto bagus di website ini...',
    traits: ['Orang Keren', 'IQ 115'],
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
    traits: ['Motivator', 'Energetik'],
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
    traits: ['Skena', 'Roll Film'],
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
    traits: ['Si Paling On-Time', 'Banyak Nanya'],
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
    traits: ['Santuy', 'Orang Sabar'],
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
    traits: ['Dewa Sinyal', 'Penyelamat Kuota'],
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
    traits: ['Pecinta Alam', 'Kang Camping'],
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
    traits: ['Entertainer', 'Jokes Bapack'],
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
    traits: ['Supir Andalan', 'GPS Berjalan'],
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
    traits: ['Menteri Keuangan', 'PIC Tiket'],
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
    traits: ['Anak Senja', 'Pecandu Kafein'],
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
    traits: ['Tukang Ngide', 'Jalur Alternatif'],
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
    traits: ['Si Paling Ngebut', 'Gak Sabaran'],
    socials: { instagram: '@navin' }
  },
  {
    id: 'zidan',
    name: 'Zidan',
    role: 'The Navigator',
    quote: '"Multitalent."',
    joinYear: 2022,
    image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773596569/Gemini_Generated_Image_rjh99jrjh99jrjh9_xxsuhc.png',
    imageOffsetY: '25%', // Geser atas/bawah thumbnail (contoh: 'top', 'bottom', '20%')
    bio: 'Lu serba bisa, orang paling fleksibel. Ty bet udah mau ini itu, mvp parah. btw, TOMBOLLLLL.',
    traits: ['CEO', 'Serba Bisa'],
    socials: { instagram: '@zidan_nav' }
  }
];
