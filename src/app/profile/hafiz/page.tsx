import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA HAFIZ — Edit di sini aja! ======
const hafiz: Member = {
  id: "hafiz",
  name: "Ahmad Hapizhudin",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/f_auto,q_auto/v1773515971/hafiz_qnczjq.heic",
  imageScale: 1.7,
  socials: { instagram: "@hafiz" },
  bio: "...",
  favSong: {
    audioSrc: "/audio/nina.mp3",
    title: "Nina",
    artist: ".Feast",
    startAt: 227,
    bpm: 91,
  },
};

export default function HafizPage() {
  return <MemberDetail member={hafiz} />;
}
