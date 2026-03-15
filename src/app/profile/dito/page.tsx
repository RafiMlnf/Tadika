import MemberDetail from '@/components/MemberDetail';
import { Member } from '@/data/members';

// ====== DATA DITO — Edit di sini aja! ======
const dito: Member = {
  id: 'dito',
  name: 'Dito',
  role: 'Member',
  quote: '"Yang penting makan enak."',
  joinYear: 2024,
  image: '',
  bio: 'Wingstop.',
  favSong: {
    youtubeId: 'iygXgP2nOF4',
    title: 'Take a Chance with Me',
    artist: 'NIKI',
    startAt: 192,
  },
  stats: { trips: 4, photos: 50 },
  socials: { instagram: '@dito' },
};

export default function DitoPage() {
  return <MemberDetail member={dito} />;
}
