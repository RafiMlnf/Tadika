import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA MIKAEL — Edit di sini aja! ======
const mikael: Member = {
  id: "mikael",
  name: "Mikael Rivaldo",
  quote: "Malas.",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773612289/mikel_siwync.jpg",
  bio: "Depan PC mulu.",
  traits: ["Anak Warnet", "Mageran"],
  socials: { instagram: "@mikael" },
};

export default function MikaelPage() {
  return <MemberDetail member={mikael} />;
}
