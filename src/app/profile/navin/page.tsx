import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA NAVIN — Edit di sini aja! ======
const navin: Member = {
  id: "navin",
  name: "Fadhlurohman Fatikh Navintino",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1775524923/IMG_2974_yxvsap.jpg",
  imageOffsetY: "70%",
  imageScale: 1.7,
  socials: { instagram: "@napvn" },
  bio: "...",
};

export default function NavinPage() {
  return <MemberDetail member={navin} />;
}
