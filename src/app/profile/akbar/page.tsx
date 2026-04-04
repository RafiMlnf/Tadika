import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA AKBAR — Edit di sini aja! ======
const akbar: Member = {
  id: "akbar",
  name: "Nurul Akbar",
  image: "",
  bio: "Urusan logistik tiket dan penginapan, Akbar yang handle.",
  socials: { instagram: "@akbar" },
};

export default function AkbarPage() {
  return <MemberDetail member={akbar} />;
}
