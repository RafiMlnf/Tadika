import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA HAFIZ — Edit di sini aja! ======
const hafiz: Member = {
  id: 'hafiz',
  name: 'Hafiz',
  role: 'Member',
  quote: 'Pria ambisius.',
  joinYear: 2023,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/f_auto,q_auto/v1773515971/hafiz_qnczjq.heic',
  imageScale: 1.7,
  bio: 'Pria ambisius, lu dapet hasil dari lu belajar selama ini respect, tapi jokes lu anj.',
  traits: ['Ambisius', 'Jokes Gelap'],
  socials: { instagram: '@hafiz' },
};

export default function HafizPage() {
  return <MemberDetail member={hafiz} />;
}
