import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DIMAS — Edit di sini aja! ======
const dimas: Member = {
  id: "dimas",
  name: "Dimas Adi Nugraha",
  image: "",
  socials: { instagram: "@fvckngrh" },
  bio: "...",
};

export default function DimasPage() {
  return <MemberDetail member={dimas} />;
}
