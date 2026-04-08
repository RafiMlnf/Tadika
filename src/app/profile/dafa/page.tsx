import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DAFA — Edit di sini aja! ======
const dafa: Member = {
  id: "dafa",
  name: "Dafa Alfiana Erlangga",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/q_auto/f_auto/v1775654968/dafa_tl2eds.png",
  imageScale: 1.1,
  imageOffsetY: "1%",
  favSong: {
    audioSrc: "/audio/iwitw.mp3",
    title: "I Want It That Way",
    artist: "Backstreet Boys",
    startAt: 144.5,
    bpm: 100
  },
  socials: { instagram: "@dxfng_" },
  bio: "...",
};

export default function DafaPage() {
  return <MemberDetail member={dafa} />;
}
