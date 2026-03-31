export interface Member {
  id: string;
  name: string;
  quote: string;
  image: string;
  imageScale?: number; // Optional zoom level for the physical image tag (e.g. 1.2 for 120% zoom)
  imageOffsetX?: string; // Geser X foto (contoh: '-40%', 'center', 'right')
  imageOffsetY?: string; // Geser Y foto (contoh: '50%', 'center', 'bottom')
  bio: string;
  spotifyTrackId?: string; // Spotify track ID untuk lagu favorit
  favSong?: {
    // Lagu favorit via file audio lokal (Web Audio API / BPM Sync)
    audioSrc: string; // Path ke file audio lokal, contoh: '/audio/arteri.mp3'
    title: string;    // Judul lagu
    artist: string;   // Nama artis
    startAt?: number; // Mulai dari detik ke berapa (default: 0)
    bpm?: number;     // BPM (Beats Per Minute) lagu untuk sync manual
  };
  traits: string[];
  socials: {
    instagram?: string;
    twitter?: string;
  };
}

export const members: Member[] = [
  {
    id: "hafiz",
    name: "Hafiz",
    quote: "Sahabat D.",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/f_auto,q_auto/v1773515971/hafiz_qnczjq.heic",
    imageScale: 1.7,
    bio: "Pria ambisius, lu dapet hasil dari lu belajar selama ini respect, tapi jokes lu anj.",
    traits: ["Ambisius", "Jokes Gelap"],
    socials: { instagram: "@hafiz" },
  },
  {
    id: "mikael",
    name: "Mikael",
    quote: "Malas.",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612289/mikel_siwync.jpg",
    imageOffsetY: "25%",
    bio: "...",
    traits: ["PC", "Malas"],
    socials: { instagram: "@mikaelrivaldo" },
  },
  {
    id: "dito",
    name: "Dito",
    quote: "...",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773603339/dito_ckdfsm.png",
    imageOffsetY: "25%",
    bio: "Selalu mementingkan kuliner di setiap destinasi.",
    traits: ["JKT48", "Wingstop"],
    socials: { instagram: "@dito" },
  },
  {
    id: "rafi",
    name: "Rafi",
    quote: "Keren bgt jir gw",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773516975/rafi_zyj2kl.jpg",
    imageScale: 1.7, // <--- TAMBAHKAN INI. 1.0 (Normal), 1.2 (Zoom 120%), 1.5 (Zoom 150%) dst.
    bio: "Orang di balik sebagian besar foto bagus di website ini...",
    traits: ["Orang Keren", "IQ 115"],
    socials: { instagram: "@rafi.shoots" },
  },
  {
    id: "gilar",
    name: "Gilar",
    quote: '"Gass terus."',
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612295/gilar_spcbxx.jpg",
    imageOffsetY: "35%",
    bio: "Pemberi semangat kalau rombongan sudah mulai capek.",
    traits: ["Motivator", "Energetik"],
    socials: { instagram: "@gilar" },
  },
  {
    id: "ricky",
    name: "Ricky",
    quote: '"Tunggu dulu, foto bentar."',
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/ricky_c8uiry.jpg",
    imageScale: 1.7,
    imageOffsetY: "bottom",
    imageOffsetX: "10px",
    bio: "Pendamping fotografer dan hobi foto pakai film.",
    traits: ["Skena", "Roll Film"],
    socials: { instagram: "@ricky" },
  },
  {
    id: "hadi",
    name: "Hadi",
    quote: '"Jam berapa ngumpulnya?"',
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612288/hadi_jnl2xo.jpg",
    imageOffsetY: "25%",
    bio: "Sering menanyakan jadwal namun sering kali juga on-time.",
    traits: ["Si Paling On-Time", "Banyak Nanya"],
    socials: { instagram: "@hadi" },
  },
  {
    id: "dzaki",
    name: "Dzaki",
    quote: '"Santuy aja lah."',
    image: "",
    bio: "Paling tenang saat nyasar atau ada masalah di jalan.",
    traits: ["Santuy", "Orang Sabar"],
    socials: { instagram: "@dzaki" },
  },
  {
    id: "daffa",
    name: "Daffa",
    quote: '"Cari WiFi di mana nih?"',
    image: "",
    bio: "Selalu butuh sinyal dan koneksi, tukang sebar hotspot.",
    traits: ["Dewa Sinyal", "Penyelamat Kuota"],
    socials: { instagram: "@daffa" },
  },
  {
    id: "farhan",
    name: "Farhan",
    quote: '"Gas aja mumpung cerah."',
    image: "",
    bio: "Penggemar kegiatan outdoor dan selalu sedia peralatan camping.",
    traits: ["Pecinta Alam", "Kang Camping"],
    socials: { instagram: "@farhan" },
  },
  {
    id: "dimas",
    name: "Dimas",
    quote: '"Bro, dengerin playlist gue nih."',
    image: "",
    bio: "Tukang setel musik di mobil dan pencair suasana saat trip mulai garing. Selalu bawa speaker Bluetooth ke mana-mana dan stok jokes bapack-bapack.",
    traits: ["Entertainer", "Jokes Bapack"],
    socials: { instagram: "@dimas.vibes" },
  },
  {
    id: "raka",
    name: "Raka",
    quote: '"Gue yang nyetir aja."',
    image: "",
    bio: "Supir andalan saat perjalanan jauh. Sangat hafal rute.",
    traits: ["Supir Andalan", "GPS Berjalan"],
    socials: { instagram: "@raka" },
  },
  {
    id: "akbar",
    name: "Akbar",
    quote: '"Udah pesan tiket blm?"',
    image: "",
    bio: "Urusan logistik tiket dan penginapan, Akbar yang handle.",
    traits: ["Menteri Keuangan", "PIC Tiket"],
    socials: { instagram: "@akbar" },
  },
  {
    id: "dafa",
    name: "Dafa",
    quote: '"Ayo mampir beli kopi bentar."',
    image: "",
    bio: "Paling sering butuh istirahat ngopi dalam perjalanan.",
    traits: ["Anak Senja", "Pecandu Kafein"],
    socials: { instagram: "@dafa" },
  },
  {
    id: "arifin",
    name: "Arifin",
    quote: '"Gampang itu mah."',
    image: "",
    bio: "Tukang ngide buat masuk ke rute yang nyeleneh.",
    traits: ["Tukang Ngide", "Jalur Alternatif"],
    socials: { instagram: "@arifin" },
  },
  {
    id: "navin",
    name: "Navin",
    quote: '"Udah nyampe belom bos?"',
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg",
    bio: "Paling ngga sabaran kalau di jalan tol.",
    traits: ["Si Paling Ngebut", "Gak Sabaran"],
    socials: { instagram: "@navin" },
  },
  {
    id: "zidan",
    name: "Zidan",
    quote: '"Multitalent."',
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773596569/Gemini_Generated_Image_rjh99jrjh99jrjh9_xxsuhc.png",
    imageOffsetY: "25%", // Geser atas/bawah thumbnail (contoh: 'top', 'bottom', '20%')
    bio: "Lu serba bisa, orang paling fleksibel. Ty bet udah mau ini itu, mvp parah. btw, TOMBOLLLLL.",
    traits: ["CEO", "Serba Bisa"],
    socials: { instagram: "@zidan_nav" },
  },
];
