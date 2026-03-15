import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA RICKY — Edit di sini aja! ======
const ricky: Member = {
  id: 'ricky',
  name: 'Ricky',
  role: 'Member',
  quote: '"Tunggu dulu, foto bentar."',
  joinYear: 2023,
  image: 'https://res.cloudinary.com/dpr6rjjun/image/upload/v1773515972/ricky_c8uiry.jpg',
  imageScale: 1.7,
  imageOffsetY: 'bottom',
  bio: 'Pendamping fotografer dan hobi foto pakai film.',
  traits: ['Skena', 'Roll Film'],
  socials: { instagram: '@ricky' },
};

export default function RickyPage() {
  return <MemberDetail member={ricky} />;
}
