import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA RAKA — Edit di sini aja! ======
const raka: Member = {
  id: "raka",
  name: "Muhammad Rizky Raka Pratama",
  image: "",
  favSong: {
    audioSrc: "/audio/akukamusamudra.mp3",
    title: "Aku Kamu dan Samudra",
    artist: "Rebellion Rose",
    startAt: 51,
    bpm: 184
  },
  socials: { instagram: "@mrrizkyrp" },
  bio: "...",
};

export default function RakaPage() {
  return <MemberDetail member={raka} />;
}
