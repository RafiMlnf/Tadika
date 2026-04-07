import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DITO — Edit di sini aja! ======
const dito: Member = {
  id: "dito",
  name: "Rizjky Dito Ridwansyah",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773603339/dito_ckdfsm.png",
  favSong: {
    audioSrc: "/audio/tacwm.mp3",
    title: "Take a Chance with Me",
    artist: "NIKI",
    startAt: 253,
    bpm: 94
  },
  socials: { instagram: "@dito" },
  bio: "...",
};

export default function DitoPage() {
  return <MemberDetail member={dito} />;
}
