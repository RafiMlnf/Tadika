import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA HADI — Edit di sini aja! ======
const hadi: Member = {
  id: "hadi",
  name: "Hadi Permana",
  quote: '"Jam berapa ngumpulnya?"',
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612288/hadi_jnl2xo.jpg",
  bio: "Sering menanyakan jadwal namun sering kali juga on-time.",
  traits: ["Si Paling On-Time", "Banyak Nanya"],
  socials: { instagram: "@hadi" },
};

export default function HadiPage() {
  return <MemberDetail member={hadi} />;
}
