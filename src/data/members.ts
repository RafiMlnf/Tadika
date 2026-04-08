export interface MemberContentBlock {
  label: string;
  value: string;
}

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
  bio?: string;
  extraContent?: MemberContentBlock[];
  socials: {
    instagram?: string;
    twitter?: string;
  };
}

export const members: Member[] = [
  {
    id: "hafiz",
    name: "Hafiz",
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1775526240/hafiz_mjvedf.jpg",
    imageOffsetY: "25%",
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
    imageOffsetY: "80%",
    imageOffsetX: "40%",
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
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1775526825/raka_ywzzpl.jpg",
    imageOffsetY: "35%",
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
    image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1775654768/dafa_igwof5.jpg",
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
  {
    id: "shofwan",
    name: "Shofwan",
    image: "",
    socials: { instagram: "@shofwan" },
  },
  {
    id: "diska",
    name: "Diska",
    image: "",
    socials: { instagram: "@diska" },
  },
  {
    id: "yuda",
    name: "Yuda",
    image: "",
    socials: { instagram: "@yuda" },
  },
];
