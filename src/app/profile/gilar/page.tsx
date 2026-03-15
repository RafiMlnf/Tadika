import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA GILAR — Edit di sini aja! ======
const gilar: Member = {
  id: 'gilar',
  name: 'Gilar',
  quote: '"Gass terus."',
  image: '',
  bio: 'Pemberi semangat kalau rombongan sudah mulai capek.',
  traits: ['Motivator', 'Energetik'],
  socials: { instagram: '@gilar' },
};

export default function GilarPage() {
  return <MemberDetail member={gilar} />;
}
