import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DZAKI — Edit di sini aja! ======
const dzaki: Member = {
  id: "dzaki",
  name: "MuhammadDzaki Abiyyu",
  image: "",
  bio: "Paling tenang saat nyasar atau ada masalah di jalan.",
  socials: { instagram: "@dzaki" },
};

export default function DzakiPage() {
  return <MemberDetail member={dzaki} />;
}
