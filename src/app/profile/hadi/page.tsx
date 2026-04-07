import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA HADI — Edit di sini aja! ======
const hadi: Member = {
  id: "hadi",
  name: "Hadi Permana",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1775527026/hadi_gxuofm.jpg",
  imageScale: 1.5,
  socials: { instagram: "@hdyy_prmnaa" },
  bio: "...",
};

export default function HadiPage() {
  return <MemberDetail member={hadi} />;
}
