export interface Member {
  id: string;
  name: string;
  image: string;
  imageScale?: number;
  imageOffsetX?: string;
  imageOffsetY?: string;
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
    socials: { instagram: "@hafiz" },
  },
  {
    id: "mikael",
    name: "Mikael",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612289/mikel_siwync.jpg",
    imageOffsetY: "25%",
    socials: { instagram: "@mikaelrivaldo" },
  },
  {
    id: "dito",
    name: "Dito",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773603339/dito_ckdfsm.png",
    imageOffsetY: "25%",
    socials: { instagram: "@dito" },
  },
  {
    id: "rafi",
    name: "Rafi",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/q_auto/f_auto/v1775159163/rafi_zvx9um.png",
    imageOffsetY: "25%",
    socials: { instagram: "@rafi.shoots" },
  },
  {
    id: "gilar",
    name: "Gilar",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612295/gilar_spcbxx.jpg",
    imageOffsetY: "35%",
    socials: { instagram: "@gilar" },
  },
  {
    id: "ricky",
    name: "Ricky",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/ricky_c8uiry.jpg",
    imageScale: 1.7,
    imageOffsetY: "bottom",
    imageOffsetX: "10px",
    socials: { instagram: "@ricky" },
  },
  {
    id: "hadi",
    name: "Hadi",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612288/hadi_jnl2xo.jpg",
    imageOffsetY: "25%",
    socials: { instagram: "@hadi" },
  },
  {
    id: "dzaki",
    name: "Dzaki",
    image: "",
    socials: { instagram: "@dzaki" },
  },
  {
    id: "daffa",
    name: "Daffa",
    image: "",
    socials: { instagram: "@daffa" },
  },
  {
    id: "farhan",
    name: "Farhan",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/q_auto/f_auto/v1775157544/paul_oroduk.png",
    imageOffsetY: "25%",
    socials: { instagram: "@farhan" },
  },
  {
    id: "dimas",
    name: "Dimas",
    image: "",
    socials: { instagram: "@dimas.vibes" },
  },
  {
    id: "raka",
    name: "Raka",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/q_auto/f_auto/v1775156829/raka_bspiqq.jpg",
    imageOffsetY: "25%",
    socials: { instagram: "@raka" },
  },
  {
    id: "akbar",
    name: "Akbar",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1775157711/akbar_plwnow.jpg",
    imageOffsetY: "15%",
    socials: { instagram: "@akbar" },
  },
  {
    id: "dafa",
    name: "Dafa",
    image: "",
    socials: { instagram: "@dafa" },
  },
  {
    id: "arifin",
    name: "Arifin",
    image: "",
    socials: { instagram: "@arifin" },
  },
  {
    id: "navin",
    name: "Navin",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg",
    socials: { instagram: "@navin" },
  },
  {
    id: "zidan",
    name: "Zidan",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773596569/Gemini_Generated_Image_rjh99jrjh99jrjh9_xxsuhc.png",
    imageOffsetY: "25%",
    socials: { instagram: "@..." },
  },
];
