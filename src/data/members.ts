export interface Member {
  id: string;
  name: string;
  image: string;
  imageScale?: number;
  imageOffsetX?: string;
  imageOffsetY?: string;
  bio: string;
  spotifyTrackId?: string;
  favSong?: {
    audioSrc: string;
    title: string;
    artist: string;
    startAt?: number;
    bpm?: number;
  };
  socials: {
    instagram?: string;
    twitter?: string;
  };
}

export const members: Member[] = [
  {
    id: "hafiz",
    name: "Hafiz",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/f_auto,q_auto/v1773515971/hafiz_qnczjq.heic",
    imageScale: 1.7,
    bio: "Pria ambisius, lu dapet hasil dari lu belajar selama ini respect, tapi jokes lu anj.",
    socials: { instagram: "@hafiz" },
  },
  {
    id: "mikael",
    name: "Mikael",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612289/mikel_siwync.jpg",
    imageOffsetY: "25%",
    bio: "...",
    socials: { instagram: "@mikaelrivaldo" },
  },
  {
    id: "dito",
    name: "Dito",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773603339/dito_ckdfsm.png",
    imageOffsetY: "25%",
    bio: "Selalu mementingkan kuliner di setiap destinasi.",
    socials: { instagram: "@dito" },
  },
  {
    id: "rafi",
    name: "Rafi",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/q_auto/f_auto/v1775159163/rafi_zvx9um.png",
    imageOffsetY: "25%",
    bio: "Orang di balik sebagian besar foto bagus di website ini...",
    socials: { instagram: "@rafi.shoots" },
  },
  {
    id: "gilar",
    name: "Gilar",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612295/gilar_spcbxx.jpg",
    imageOffsetY: "35%",
    bio: "Pemberi semangat kalau rombongan sudah mulai capek.",
    socials: { instagram: "@gilar" },
  },
  {
    id: "ricky",
    name: "Ricky",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/ricky_c8uiry.jpg",
    imageScale: 1.7,
    imageOffsetY: "bottom",
    imageOffsetX: "10px",
    bio: "Pendamping fotografer dan hobi foto pakai film.",
    socials: { instagram: "@ricky" },
  },
  {
    id: "hadi",
    name: "Hadi",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612288/hadi_jnl2xo.jpg",
    imageOffsetY: "25%",
    bio: "Sering menanyakan jadwal namun sering kali juga on-time.",
    socials: { instagram: "@hadi" },
  },
  {
    id: "dzaki",
    name: "Dzaki",
    image: "",
    bio: "Paling tenang saat nyasar atau ada masalah di jalan.",
    socials: { instagram: "@dzaki" },
  },
  {
    id: "daffa",
    name: "Daffa",
    image: "",
    bio: "Selalu butuh sinyal dan koneksi, tukang sebar hotspot.",
    socials: { instagram: "@daffa" },
  },
  {
    id: "farhan",
    name: "Farhan",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/q_auto/f_auto/v1775157544/paul_oroduk.png",
    imageOffsetY: "25%",
    bio: "Penggemar kegiatan outdoor dan selalu sedia peralatan camping.",
    socials: { instagram: "@farhan" },
  },
  {
    id: "dimas",
    name: "Dimas",
    image: "",
    bio: "Tukang setel musik di mobil dan pencair suasana saat trip mulai garing. Selalu bawa speaker Bluetooth ke mana-mana dan stok jokes bapack-bapack.",
    socials: { instagram: "@dimas.vibes" },
  },
  {
    id: "raka",
    name: "Raka",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/q_auto/f_auto/v1775156829/raka_bspiqq.jpg",
    imageOffsetY: "25%",
    bio: "Supir andalan saat perjalanan jauh. Sangat hafal rute.",
    socials: { instagram: "@raka" },
  },
  {
    id: "akbar",
    name: "Akbar",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1775157711/akbar_plwnow.jpg",
    imageOffsetY: "15%",
    bio: "Urusan logistik tiket dan penginapan, Akbar yang handle.",
    socials: { instagram: "@akbar" },
  },
  {
    id: "dafa",
    name: "Dafa",
    image: "",
    bio: "Paling sering butuh istirahat ngopi dalam perjalanan.",
    socials: { instagram: "@dafa" },
  },
  {
    id: "arifin",
    name: "Arifin",
    image: "",
    bio: "Tukang ngide buat masuk ke rute yang nyeleneh.",
    socials: { instagram: "@arifin" },
  },
  {
    id: "navin",
    name: "Navin",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg",
    bio: "Paling ngga sabaran kalau di jalan tol.",
    socials: { instagram: "@navin" },
  },
  {
    id: "zidan",
    name: "Zidan",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773596569/Gemini_Generated_Image_rjh99jrjh99jrjh9_xxsuhc.png",
    imageOffsetY: "25%",
    bio: "...",
    socials: { instagram: "@..." },
  },
];
