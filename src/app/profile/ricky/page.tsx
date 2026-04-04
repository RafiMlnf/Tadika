import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA RICKY — Edit di sini aja! ======
const ricky: Member = {
  id: "ricky",
  name: "Ricky Alfian Saputra",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/ricky_c8uiry.jpg",
  imageScale: 1.7,
  imageOffsetY: "bottom",
  bio: "Pendamping fotografer dan hobi foto pakai film.",
  socials: { instagram: "@ricky" },
};

export default function RickyPage() {
  return <MemberDetail member={ricky} />;
}
