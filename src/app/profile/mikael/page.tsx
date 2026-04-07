import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA MIKAEL — Edit di sini aja! ======
const mikael: Member = {
  id: "mikael",
  name: "Mikael Rivaldo",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1775524923/IMG_3008_mf9go5.jpg",
  imageOffsetY: "50%",
  imageScale: 1.7,
  socials: { instagram: "@mikael" },
  bio: "...",
};

export default function MikaelPage() {
  return <MemberDetail member={mikael} />;
}
