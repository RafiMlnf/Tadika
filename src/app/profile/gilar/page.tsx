import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA GILAR — Edit di sini aja! ======
const gilar: Member = {
  id: "gilar",
  name: "Gilar Sumilar",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612295/gilar_spcbxx.jpg",
  favSong: {
    audioSrc: "/audio/littlebylittle.mp3",
    title: "Little by Little",
    artist: "Oasis",
    startAt: 46,
    bpm: 73
  },
  socials: { instagram: "@glrsfdamm" },
  bio: "...",
};

export default function GilarPage() {
  return <MemberDetail member={gilar} />;
}
