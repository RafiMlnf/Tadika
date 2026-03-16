import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DITO — Edit di sini aja! ======
const dito: Member = {
  id: "dito",
  name: "Rizjky Dito Ridwansyah",
  quote: '"Yang penting makan enak."',
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773603339/dito_ckdfsm.png",
  bio: "Wingstop.",
  favSong: {
    audioSrc: "/audio/take-a-chance-with-me.mp3", // File audio lokal di folder public/audio/
    title: "Take a Chance with Me",
    artist: "NIKI",
    startAt: 192,
  },
  traits: ["Foodie", "Makmur"],
  socials: { instagram: "@dito" },
};

export default function DitoPage() {
  return <MemberDetail member={dito} />;
}
