import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA RAFI — Edit di sini aja! ======
const rafi: Member = {
  id: "rafi",
  name: "Rafi Maulana Firdaus",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/q_auto/f_auto/v1775158090/pagerafi_b3uzhn.png",
  favSong: {
    audioSrc: "/audio/arteri.mp3", // File audio lokal di folder public/audio/
    title: "Arteri",
    artist: ".Feast",
    startAt: 232,
    bpm: 182,
  },
  socials: { instagram: "@rafimlnf" },
  bio: "...",
};

export default function RafiPage() {
  return <MemberDetail member={rafi} />;
}
