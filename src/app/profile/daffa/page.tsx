import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DAFFA — Edit di sini aja! ======
const daffa: Member = {
  id: "daffa",
  name: "Muhammad Daffa Maulana Arrasyid",
  image: "",
  socials: { instagram: "@nullable_human" },
  bio: "...",
};

export default function DaffaPage() {
  return <MemberDetail member={daffa} />;
}
