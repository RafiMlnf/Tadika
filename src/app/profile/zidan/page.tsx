import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA ZIDAN — Edit di sini aja! ======
const zidan: Member = {
  id: "zidan",
  name: "Maulana Zidan Perdana",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773596569/Gemini_Generated_Image_rjh99jrjh99jrjh9_xxsuhc.png",
  favSong: {
    audioSrc: "/audio/otuan.mp3",
    title: "o`Tuan",
    artist: ".Feast",
    startAt: 135,
    bpm: 131
  },
  socials: { instagram: "@..." },
};

export default function ZidanPage() {
  return <MemberDetail member={zidan} />;
}
