import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA FARHAN — Edit di sini aja! ======
const farhan: Member = {
  id: 'farhan',
  name: 'Farhan',
  role: 'Member',
  quote: '"Gas aja mumpung cerah."',
  joinYear: 2023,
  image: '',
  bio: 'Penggemar kegiatan outdoor dan selalu sedia peralatan camping.',
  stats: { trips: 9, photos: 150 },
  socials: { instagram: '@farhan' },
};

export default function FarhanPage() {
  return <MemberDetail member={farhan} />;
}
