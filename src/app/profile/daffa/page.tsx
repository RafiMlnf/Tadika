import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DAFFA — Edit di sini aja! ======
const daffa: Member = {
  id: 'daffa',
  name: 'Daffa',
  role: 'Member',
  quote: '"Cari WiFi di mana nih?"',
  joinYear: 2022,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg',
  bio: 'Selalu butuh sinyal dan koneksi, tukang sebar hotspot.',
  stats: { trips: 13, photos: 400 },
  socials: { instagram: '@daffa' },
};

export default function DaffaPage() {
  return <MemberDetail member={daffa} />;
}
