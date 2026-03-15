import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DAFFA — Edit di sini aja! ======
const daffa: Member = {
  id: 'daffa',
  name: 'Daffa',
  quote: '"Cari WiFi di mana nih?"',
  image: '',
  bio: 'Selalu butuh sinyal dan koneksi, tukang sebar hotspot.',
  traits: ['Dewa Sinyal', 'Penyelamat Kuota'],
  socials: { instagram: '@daffa' },
};

export default function DaffaPage() {
  return <MemberDetail member={daffa} />;
}
