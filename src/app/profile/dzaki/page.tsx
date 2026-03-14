import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DZAKI — Edit di sini aja! ======
const dzaki: Member = {
  id: 'dzaki',
  name: 'Dzaki',
  role: 'Member',
  quote: '"Santuy aja lah."',
  joinYear: 2024,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg',
  bio: 'Paling tenang saat nyasar atau ada masalah di jalan.',
  stats: { trips: 3, photos: 45 },
  socials: { instagram: '@dzaki' },
};

export default function DzakiPage() {
  return <MemberDetail member={dzaki} />;
}
