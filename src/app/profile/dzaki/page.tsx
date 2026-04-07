import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DZAKI — Edit di sini aja! ======
const dzaki: Member = {
  id: "dzaki",
  name: "Muhammad Dzaki Abiyyu",
  image: "",
  socials: { instagram: "@ccythnz" },
  bio: "...",
};

export default function DzakiPage() {
  return <MemberDetail member={dzaki} />;
}
