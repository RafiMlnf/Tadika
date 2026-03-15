import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DZAKI — Edit di sini aja! ======
const dzaki: Member = {
  id: 'dzaki',
  name: 'Dzaki',
  role: 'Member',
  quote: '"Santuy aja lah."',
  joinYear: 2024,
  image: '',
  bio: 'Paling tenang saat nyasar atau ada masalah di jalan.',
  traits: ['Santuy', 'Orang Sabar'],
  socials: { instagram: '@dzaki' },
};

export default function DzakiPage() {
  return <MemberDetail member={dzaki} />;
}
