import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA ARIFIN — Edit di sini aja! ======
const arifin: Member = {
  id: "arifin",
  name: "MuhammadArifin",
  image: "",
  socials: { instagram: "@arifin" },
};

export default function ArifinPage() {
  return <MemberDetail member={arifin} />;
}
