import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA DIMAS — Edit di sini aja! ======
const dimas: Member = {
  id: "dimas",
  name: "Dimas Adi Nugraha",
  image: "",
  bio: "Tukang setel musik di mobil dan pencair suasana saat trip mulai garing. Selalu bawa speaker Bluetooth ke mana-mana dan stok jokes bapack-bapack.",
  socials: { instagram: "@dimas.vibes" },
};

export default function DimasPage() {
  return <MemberDetail member={dimas} />;
}
