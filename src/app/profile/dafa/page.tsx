import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DAFA — Edit di sini aja! ======
const dafa: Member = {
  id: "dafa",
  name: "Dafa Alfiana Erlangga",
  image: "",
  socials: { instagram: "@dxfng_" },
  bio: "...",
};

export default function DafaPage() {
  return <MemberDetail member={dafa} />;
}
