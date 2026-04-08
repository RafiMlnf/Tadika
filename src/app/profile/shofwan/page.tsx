import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

const shofwan: Member = {
  id: "shofwan",
  name: "Shofwan",
  image: "",
  socials: { instagram: "@shofwan" },
};

export default function ShofwanPage() {
  return <MemberDetail member={shofwan} />;
}
