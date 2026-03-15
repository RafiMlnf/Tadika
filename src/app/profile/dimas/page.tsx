import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DIMAS — Edit di sini aja! ======
const dimas: Member = {
  id: 'dimas',
  name: 'Dimas',
  role: 'The Entertainer',
  quote: '"Bro, dengerin playlist gue nih."',
  joinYear: 2022,
  image: '',
  bio: 'Tukang setel musik di mobil dan pencair suasana saat trip mulai garing. Selalu bawa speaker Bluetooth ke mana-mana dan stok jokes bapack-bapack.',
  stats: { trips: 12, photos: 180 },
  socials: { instagram: '@dimas.vibes' },
};

export default function DimasPage() {
  return <MemberDetail member={dimas} />;
}
