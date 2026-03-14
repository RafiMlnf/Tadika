import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA ARIFIN — Edit di sini aja! ======
const arifin: Member = {
  id: 'arifin',
  name: 'Arifin',
  role: 'Member',
  quote: '"Gampang itu mah."',
  joinYear: 2024,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg',
  bio: 'Tukang ngide buat masuk ke rute yang nyeleneh.',
  stats: { trips: 4, photos: 30 },
  socials: { instagram: '@arifin' },
};

export default function ArifinPage() {
  return <MemberDetail member={arifin} />;
}
