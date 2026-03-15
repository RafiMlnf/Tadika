import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA AKBAR — Edit di sini aja! ======
const akbar: Member = {
  id: 'akbar',
  name: 'Akbar',
  role: 'Member',
  quote: '"Udah pesan tiket blm?"',
  joinYear: 2023,
  image: '',
  bio: 'Urusan logistik tiket dan penginapan, Akbar yang handle.',
  traits: ['Menteri Keuangan', 'PIC Tiket'],
  socials: { instagram: '@akbar' },
};

export default function AkbarPage() {
  return <MemberDetail member={akbar} />;
}
