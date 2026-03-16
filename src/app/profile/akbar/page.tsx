import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA AKBAR — Edit di sini aja! ======
const akbar: Member = {
  id: "akbar",
  name: "Nurul Akbar",
  quote: '"Udah pesan tiket blm?"',
  image: "",
  bio: "Urusan logistik tiket dan penginapan, Akbar yang handle.",
  traits: ["Menteri Keuangan", "PIC Tiket"],
  socials: { instagram: "@akbar" },
};

export default function AkbarPage() {
  return <MemberDetail member={akbar} />;
}
