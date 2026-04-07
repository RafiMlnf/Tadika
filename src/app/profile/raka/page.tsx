import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA RAKA — Edit di sini aja! ======
const raka: Member = {
  id: "raka",
  name: "Muhammad Rizky Raka Pratama",
  image: "",
  socials: { instagram: "@raka" },
  bio: "...",
};

export default function RakaPage() {
  return <MemberDetail member={raka} />;
}
