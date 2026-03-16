import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA ARIFIN — Edit di sini aja! ======
const arifin: Member = {
  id: "arifin",
  name: "MuhammadArifin",
  quote: '"Gampang itu mah."',
  image: "",
  bio: "Tukang ngide buat masuk ke rute yang nyeleneh.",
  traits: ["Tukang Ngide", "Jalur Alternatif"],
  socials: { instagram: "@arifin" },
};

export default function ArifinPage() {
  return <MemberDetail member={arifin} />;
}
