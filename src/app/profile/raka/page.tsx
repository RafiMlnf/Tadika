import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA RAKA — Edit di sini aja! ======
const raka: Member = {
  id: 'raka',
  name: 'Raka',
  quote: '"Gue yang nyetir aja."',
  image: '',
  bio: 'Supir andalan saat perjalanan jauh. Sangat hafal rute.',
  traits: ['Supir Andalan', 'GPS Berjalan'],
  socials: { instagram: '@raka' },
};

export default function RakaPage() {
  return <MemberDetail member={raka} />;
}
