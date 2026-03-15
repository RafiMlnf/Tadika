import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DAFFA — Edit di sini aja! ======
const daffa: Member = {
  id: 'daffa',
  name: 'Daffa',
  role: 'Member',
  quote: '"Cari WiFi di mana nih?"',
  joinYear: 2022,
  image: '',
  bio: 'Selalu butuh sinyal dan koneksi, tukang sebar hotspot.',
  traits: ['Dewa Sinyal', 'Penyelamat Kuota'],
  socials: { instagram: '@daffa' },
};

export default function DaffaPage() {
  return <MemberDetail member={daffa} />;
}
