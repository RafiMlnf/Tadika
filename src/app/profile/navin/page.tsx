import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA NAVIN — Edit di sini aja! ======
const navin: Member = {
  id: 'navin',
  name: 'Navin',
  role: 'Member',
  quote: '"Udah nyampe belom bos?"',
  joinYear: 2023,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg',
  bio: 'Paling ngga sabaran kalau di jalan tol.',
  traits: ['Si Paling Ngebut', 'Gak Sabaran'],
  socials: { instagram: '@navin' },
};

export default function NavinPage() {
  return <MemberDetail member={navin} />;
}
