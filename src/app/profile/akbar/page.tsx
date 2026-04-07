import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA AKBAR — Edit di sini aja! ======
const akbar: Member = {
  id: "akbar",
  name: "Nurul Akbar",
  image: "",
  socials: { instagram: "@akbar" },
  bio: "...",
};

export default function AkbarPage() {
  return <MemberDetail member={akbar} />;
}
