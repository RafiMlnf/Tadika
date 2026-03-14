import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA ZIDAN — Edit di sini aja! ======
const zidan: Member = {
  id: 'zidan',
  name: 'Zidan',
  role: 'The Navigator',
  quote: '"Multitalent."',
  joinYear: 2022,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/navin_j6quol.jpg',
  bio: 'Lu serba bisa, orang paling fleksibel. Ty bet udah mau ini itu, mvp parah. btw, TOMBOLLLLL.',
  stats: { trips: 15, photos: 420 },
  socials: { instagram: '@zidan_nav' },
};

export default function ZidanPage() {
  return <MemberDetail member={zidan} />;
}
