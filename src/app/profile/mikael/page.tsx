import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA MIKAEL — Edit di sini aja! ======
const mikael: Member = {
  id: "mikael",
  name: "Mikael Rivaldo",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612289/mikel_siwync.jpg",
  socials: { instagram: "@mikael" },
};

export default function MikaelPage() {
  return <MemberDetail member={mikael} />;
}
