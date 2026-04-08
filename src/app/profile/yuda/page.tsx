import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

const yuda: Member = {
  id: "yuda",
  name: "Yuda",
  image: "",
  socials: { instagram: "@yuda" },
};

export default function YudaPage() {
  return <MemberDetail member={yuda} />;
}
