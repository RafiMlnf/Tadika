import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA RAFI — Edit di sini aja! ======
const rafi: Member = {
  id: "rafi",
  name: "Rafi Maulana Firdaus",
  quote: '"Keren bgt jir gw"',
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612655/rafi_syykn9.jpg",
  bio: "Orang keren",
  favSong: {
    youtubeId: "HLCLMuxV0bI", // Ganti dengan YouTube video ID yang bener
    title: "Arteri", // Ganti judul lagu
    artist: ".Feast", // Ganti nama artis
    startAt: 232, // Mulai dari detik ke-60
  },
  traits: ["Orang Keren", "IQ 115", "Event Planner"],
  socials: { instagram: "@rafimlnf" },
};

export default function RafiPage() {
  return <MemberDetail member={rafi} />;
}
