import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA HADI — Edit di sini aja! ======
const hadi: Member = {
  id: 'hadi',
  name: 'Hadi',
  role: 'Member',
  quote: '"Jam berapa ngumpulnya?"',
  joinYear: 2022,
  image: '',
  bio: 'Sering menanyakan jadwal namun sering kali juga on-time.',
  traits: ['Si Paling On-Time', 'Banyak Nanya'],
  socials: { instagram: '@hadi' },
};

export default function HadiPage() {
  return <MemberDetail member={hadi} />;
}
