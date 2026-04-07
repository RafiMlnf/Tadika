import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DZAKI — Edit di sini aja! ======
const dzaki: Member = {
  id: "dzaki",
  name: "MuhammadDzaki Abiyyu",
  image: "",
  socials: { instagram: "@dzaki" },
  bio: "...",
};

export default function DzakiPage() {
  return <MemberDetail member={dzaki} />;
}
