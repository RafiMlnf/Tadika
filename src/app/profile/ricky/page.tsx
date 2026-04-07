import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA RICKY — Edit di sini aja! ======
const ricky: Member = {
  id: "ricky",
  name: "Ricky Alfian Saputra",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/ricky_c8uiry.jpg",
  imageScale: 1.4,
  imageOffsetY: "90%",
  socials: { instagram: "@ricky" },
  bio: "...",
};

export default function RickyPage() {
  return <MemberDetail member={ricky} />;
}
