import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA FARHAN — Edit di sini aja! ======
const farhan: Member = {
  id: 'farhan',
  name: 'Farhan',
  quote: '"Gas aja mumpung cerah."',
  image: '',
  bio: 'Penggemar kegiatan outdoor dan selalu sedia peralatan camping.',
  traits: ['Pecinta Alam', 'Kang Camping'],
  socials: { instagram: '@farhan' },
};

export default function FarhanPage() {
  return <MemberDetail member={farhan} />;
}
