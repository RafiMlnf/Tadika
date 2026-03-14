import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DAFA — Edit di sini aja! ======
const dafa: Member = {
  id: 'dafa',
  name: 'Dafa',
  role: 'Member',
  quote: '"Ayo mampir beli kopi bentar."',
  joinYear: 2022,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg',
  bio: 'Paling sering butuh istirahat ngopi dalam perjalanan.',
  stats: { trips: 10, photos: 250 },
  socials: { instagram: '@dafa' },
};

export default function DafaPage() {
  return <MemberDetail member={dafa} />;
}
