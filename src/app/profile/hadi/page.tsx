import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA HADI — Edit di sini aja! ======
const hadi: Member = {
  id: 'hadi',
  name: 'Hadi',
  role: 'Member',
  quote: '"Jam berapa ngumpulnya?"',
  joinYear: 2022,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg',
  bio: 'Sering menanyakan jadwal namun sering kali juga on-time.',
  stats: { trips: 11, photos: 100 },
  socials: { instagram: '@hadi' },
};

export default function HadiPage() {
  return <MemberDetail member={hadi} />;
}
