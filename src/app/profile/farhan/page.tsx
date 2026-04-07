import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA FARHAN — Edit di sini aja! ======
const farhan: Member = {
  id: "farhan",
  name: "Muhammad Farhan Fahreza",
  image: "",
  socials: { instagram: "@ffahreza.6" },
  bio: "...",
};

export default function FarhanPage() {
  return <MemberDetail member={farhan} />;
}
