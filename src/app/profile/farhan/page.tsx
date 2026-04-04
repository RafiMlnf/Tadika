import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA FARHAN — Edit di sini aja! ======
const farhan: Member = {
  id: "farhan",
  name: "Muhammad Farhan Fahreza",
  image: "",
  bio: "Penggemar kegiatan outdoor dan selalu sedia peralatan camping.",
  socials: { instagram: "@farhan" },
};

export default function FarhanPage() {
  return <MemberDetail member={farhan} />;
}
