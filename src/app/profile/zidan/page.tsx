import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA ZIDAN — Edit di sini aja! ======
const zidan: Member = {
  id: 'zidan',
  name: 'Zidan',
  role: 'The Navigator',
  quote: '"Multitalent."',
  joinYear: 2022,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773596569/Gemini_Generated_Image_rjh99jrjh99jrjh9_xxsuhc.png',
  bio: 'Lu serba bisa, orang paling fleksibel. Ty bet udah mau ini itu, mvp parah. btw, TOMBOLLLLL.',
  traits: ['CEO', 'Serba Bisa', 'Navigator'],
  socials: { instagram: '@zidan_nav' },
};

export default function ZidanPage() {
  return <MemberDetail member={zidan} />;
}
