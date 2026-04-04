import MemberDetail from "@/components/MemberDetail";
import { Member } from "@/data/members";

// ====== DATA NAVIN — Edit di sini aja! ======
const navin: Member = {
  id: "navin",
  name: "Fadhlurohman Fatikh Navintino",
  image: "https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg",
  bio: "Paling ngga sabaran kalau di jalan tol.",
  socials: { instagram: "@napvn" },
};

export default function NavinPage() {
  return <MemberDetail member={navin} />;
}
