import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA MIKAEL — Edit di sini aja! ======
const mikael: Member = {
  id: 'mikael',
  name: 'Mikael',
  role: 'Member',
  quote: '"Boleh-boleh ayo."',
  joinYear: 2023,
  image: '',
  bio: 'Depan PC mulu.',
  traits: ['Anak Warnet', 'Mageran'],
  socials: { instagram: '@mikael' },
};

export default function MikaelPage() {
  return <MemberDetail member={mikael} />;
}
