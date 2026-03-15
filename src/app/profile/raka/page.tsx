import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA RAKA — Edit di sini aja! ======
const raka: Member = {
  id: 'raka',
  name: 'Raka',
  role: 'Member',
  quote: '"Gue yang nyetir aja."',
  joinYear: 2024,
  image: '',
  bio: 'Supir andalan saat perjalanan jauh. Sangat hafal rute.',
  traits: ['Supir Andalan', 'GPS Berjalan'],
  socials: { instagram: '@raka' },
};

export default function RakaPage() {
  return <MemberDetail member={raka} />;
}
