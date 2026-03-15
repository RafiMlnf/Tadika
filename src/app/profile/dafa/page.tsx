import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DAFA — Edit di sini aja! ======
const dafa: Member = {
  id: 'dafa',
  name: 'Dafa',
  role: 'Member',
  quote: '"Ayo mampir beli kopi bentar."',
  joinYear: 2022,
  image: '',
  bio: 'Paling sering butuh istirahat ngopi dalam perjalanan.',
  traits: ['Anak Senja', 'Pecandu Kafein'],
  socials: { instagram: '@dafa' },
};

export default function DafaPage() {
  return <MemberDetail member={dafa} />;
}
