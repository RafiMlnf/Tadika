import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

const diska: Member = {
  id: "diska",
  name: "Diska",
  image: "",
  socials: { instagram: "@diska" },
};

export default function DiskaPage() {
  return <MemberDetail member={diska} />;
}
