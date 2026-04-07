'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Scribbles from '@/components/Scribbles';
import TripSlideshow from '@/components/TripSlideshow';

/* ── Encyclopedia sections (general info cards without Highlights) ── */
const encyclopediaSections = [
  {
    id: 'budaya',
    icon: '01',
    title: 'Culture Ngehe',
    subtitle: 'Kelakuan Warga Tadika',
    content: `Setiap sirkel pasti punya kelakuan minus, ini juga sama aja. Tradisi paling bangsat: lu wajib difoto aibnya tiap trip. Voting tempat liburan di grup chat gausah ditanya, ribet dan banyak bacot. Terus pasti ada ritual sok deep talk di malam terakhir trip, padahal besoknya balik kelakuan setan lagi. Belum lagi rutinitas mukbang kuli tiap nemu tempat baru.`,
  },
  {
    id: 'milestone',
    icon: '02',
    title: 'Jejak Kasus',
    subtitle: 'Pencapaian (Kalo Bisa Disebut Gitu)',
    content: `Dari awal cuma 6 biji doang yang berangkat, sekarang massa Tadika udah bengkak jadi 20 orang. Media aib yang kekumpul udah nyentuh 1.200++ foto ngasal. Belasan trip gede udah dieksekusi, mulai dari gosong di pantai, ngos-ngosan di gunung, sampe muter-muter sok skena di kota.`,
  },
  {
    id: 'rules',
    icon: '03',
    title: 'Hukum Rimba',
    subtitle: 'Unwritten Rules',
    content: `Nih rules yang sebenernya ga ada di kertas, tapi lu langgar, lu abis. Paling sakral: "What happens in the trip, stays in the trip" (kecuali aib lu, itu beda cerita). Rule keras lainnya: semua member wajib banget join minimal 1 trip setahun. Alesan gajelas? Coret aja sih dari grup. Dan yang paling penting: ga boleh cepu dan no baper baper club.`,
  },
];

/* ── Timeline data ── */
const timelineEvents = [
  { year: '2022', month: 'Feb', event: 'Trip Bandung 1 — Tadika terlahir tanpa niat ketidaksengajaan brutal.', icon: '01' },
  { year: '2022', month: 'Agt', event: 'Trip Pangandaran — Fix pantai pertama, gosong ria bareng.', icon: '02' },
  { year: '2023', month: 'Des', event: 'Gathering Puncak Bogor — Akhir tahun sok asik pamer kedinginan.', icon: '03' },
  { year: '2024', month: 'Apr', event: 'Gunung Putri — First camping trip, isinya full komplain dan mengeluh.', icon: '04' },
  { year: '2024', month: 'Agt', event: 'Jakarta — Anak skena dadakan, ngemper gembel di kota raya.', icon: '05' },
  { year: '2025', month: 'Jan', event: 'Lembang — One day trip, isinya numpang makan doang kagak ada ujungnya.', icon: '06' },
];

/* ── Hangout spots (Markas Nongkrong) ── */
const hangoutSpots = [
  { id: 1, name: 'Tangga Darurat Samping Masjid', emoji: '→', vibe: 'Rahasia', detail: 'Tempat nongki pertama, adem ada AC bisa sebat tapi banyak dosen lewat.' },
  { id: 2, name: 'Warung Depan', emoji: '→', vibe: 'Klasik', detail: 'Ada gorengan enak jir tp skrng dah beda warung.' },
  { id: 3, name: 'Warung Nasi Bibi Seberang', emoji: '→', vibe: 'Legendaris', detail: 'Era masa kelaparan, tiap hari harus makan disitu.' },
  { id: 4, name: 'Alfamart WBM', emoji: '→', vibe: 'Strategis', detail: 'The Legend' },
  { id: 5, name: 'Belokan Rusa', emoji: '→', vibe: 'Nongki', detail: 'Gegara alfa penuh, si apis nyari tempat nongkrong ke arah kebun buah eh nemu tempat adem banyak pohon banyak nyamuk.' },
  { id: 6, name: 'Sungai Samping Kampus', emoji: '→', vibe: 'Vibes', detail: 'Udh kek camping bawa kompor & mie tiap hari' },
  { id: 7, name: 'Panggung Pakde Freedom', emoji: '→', vibe: 'Publik', detail: 'Adem sepoi syahdu suara aliran air got deket belokan rusa' },
  { id: 8, name: 'iPoint', emoji: '→', vibe: 'Modern', detail: 'Bentaran doang' },
  { id: 9, name: 'Kantin Masbro', emoji: '→', vibe: 'Basecamp', detail: 'Sang legenda yang sekarang telah dirubuhkan oleh rezim-rezim UPB, terlama setelah alfa wbm' },
];

/* ── Trip Wiki data ── */
const tripData = [
  {
    title: 'Bandung 1',
    date: 'Mar 2022',
    tags: ['Awal Mula', 'City Stroll', 'Roadtrip'],
    desc: "Awalnya wacana motoran ke Gedebage gegara Dafa ngajakin nge-thrift. Ujungnya rencana berubah jadi touring Bandung.",
    detail: `suatu hari dikelas, rafi seseorang yang menyedihkan, tiba-tiba dihampiri oleh dafa alfiana. dafa ngajak ngobrol, 
---
bro said : fi, nge thrift yo ke gedebage bandung motoran
rafi     : ayo, ajak yang lain juga yo biar ramean
bro dafa : gas
---
lalu si keren rafi menyusun dan mengajak yang lain. tapi... setelah semua tersusun, ter-plan rapih, dihari yg panas dikelas, dafa menghampiri.
---
dafa : fi kayanya gua gabisa (lupa alesan nya apa njir).
rafi : terimakasih
---
rafi kebingungan nyari siapa lagi biar partisipan pas 8 orang, hingga h-2, seseorang yang gapernah disangka, orang yang mungkin tidak bisa dianggap remeh atas kerasnya dunia upb, 
---
dzaki bilek : gua ikut, bayar berapa
---
dan tour pertama terjadi, terimakasih dzaki`,
    img: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80',
    photos: 84,
  },
  {
    title: 'Pangandaran',
    date: 'Jul 2023',
    tags: ['Gosong', 'Sunset', 'Deep Talk'],
    desc: 'Ngegas ke pantai selatan pas weekend. Nyebur bebas, nungguin sunset sok indie, dilanjut bacot malem depan api unggun.',
    detail: `Selang semesteran after bandung 1, ada usulan villa-an lagi tapi ke bogor. cuma partisipan nya kyknya dikit, yaudah geser plan extreme, berbahaya, yang mungkin dapat menyebabkan kematian, bahkan orang manapun mungkin tidak bisa (ymma). pangandaran, usulan konyol yg suprisingly ada yang minat, keren bet kalian. dengan keterbatasan anggota yg ikut tapi terjadi meski menantang batas kemampuan mental dan batin rata2 manusia UPB. bretttt baliknya ilang setengah nyawa dan akal sehat.`,
    img: '/img/pgdn.jpg',
    photos: 126,
  },
  {
    title: 'Puncak Bogor',
    date: 'Des 2023',
    tags: ['Villa', 'Ngemper', 'Gathering'],
    desc: 'Ngerayain pergantian taun di villa Puncak dengan view lumayan lah buat dibikin story IG pamer pamer dikit.',
    detail: `Kebersamaan cenah, biar ga tadika2 aja, kawan2 pengen adain acara sekelas, dimas, rafi, fajri telah pidato di grup A4 tapi gaada yg jawab, dahlah ujungnya mah tadika2 lagi. tour yg membangun chemistry tadika, emang ada yg masi asing pas di loc, tapi lihatlah sekarang.`,
    img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    photos: 67,
  },
  {
    title: 'Gunung Putri',
    date: 'Apr 2024',
    tags: ['Sok Pecinta Alam', 'Hiking', 'Stargazing'],
    desc: 'Sok asik main ke alam, nanjak cimit doang capeknya ngga ngotak, ujung-ujungnya cuma pgn rebahan doang.',
    detail: `Plan awalnya mau sawarna / goa langir banten, brett ada berita megathrust (siapa yg kaga takut coba diancam tsunami). yaudahlah geser ke gunung2an biar ga kena tsunami, bro ricky nyari2 rekomen tempat camping, nemu tu opsi loji atau gn putri, hasil vote gn putri menang. tour paling murah, ga pusing mikirin biaya, makanya biar rame lagi ngajak bro dimas dan raka, tapi si hafiz hampir gamau soalnya dia udah join satset (gasih, karena dompet telah korosi).`,
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    photos: 89,
  },
  {
    title: 'Jakarta',
    date: 'Agt 2024',
    tags: ['Skena', 'Nongkrong', 'Thrift'],
    desc: 'Sok skena muterin Jakarta. Rutenya nge-thrift gajelas, mampir cafe overprice ga ngotak, trus kelayapan jajan.',
    detail: `dadakan njir`,
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    photos: 54,
  },
  {
    title: 'Lembang',
    date: 'Jan 2025',
    tags: ['Healing', 'Makan Mulu', 'One Day Trip'],
    desc: 'Pelarian nyari angin adem sehari doang, ujung-ujungnya tetep mukbang brutal sate maranggi.',
    detail: `tba`,
    img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    photos: 72,
  },
];

export default function EnsiklopediaPage() {
  const [activeWikiIndex, setActiveWikiIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedHangout, setExpandedHangout] = useState<number | null>(null);
  const [mediaList, setMediaList] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMediaList(data);
      })
      .catch(err => console.error('Failed to load media:', err));
  }, []);

  /* ── Scroll-reveal observer ── */
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollRevealRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      );
    }
    observerRef.current.observe(node);
  }, []);

  const activeTrip = tripData[activeWikiIndex];

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />

      <Scribbles />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, paddingBottom: 100 }}>
        {/* ═══════════ HEADER ═══════════ */}
        <section style={{ paddingTop: 60, paddingBottom: 40, textAlign: 'center' }}>
          <div ref={scrollRevealRef} className="reveal-section">

            <h1 className="font-display" style={{ marginBottom: 16 }}>Ensiklopedia Tadika</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
              Semua hal absurd yang butuh lu tau tentang bader-bader ini. Mulai dari kronologi kejadian awal, kelakuan minus, sampe arsip aib terekam jelas di mari.
            </p>
          </div>
        </section>

        {/* ═══════════ KARTU ALKISAH ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 48 }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Cinematic header */}
            <div style={{
              padding: '40px 32px 32px',
              borderBottom: '1px solid var(--color-border)',
              background: 'var(--color-bg-alt)',
              textAlign: 'center',
            }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-text-muted)', display: 'block', marginBottom: 8 }}>CHAPTER 00</span>
              <h3 className="font-display" style={{ fontSize: '2rem', margin: '0 0 8px', lineHeight: 1.2 }}>
                Alkisah
              </h3>
              <p className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--color-accent)', margin: 0 }}>
                Bagaimana sekumpulan orang random bisa jadi keluarga
              </p>
            </div>

            {/* Chapter entries */}
            <div style={{ padding: '0' }}>
              {[
                {
                  chapter: 'I',
                  title: 'Asal Usul',
                  subtitle: 'Bagaimana semuanya bermula',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  content: '...',
                },
                {
                  chapter: 'II',
                  title: 'Nama "Tadika"',
                  subtitle: 'Arti di balik nama yang absurd',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  ),
                  content: '...',
                },
                {
                  chapter: 'III',
                  title: 'Dari Temen Jadi Saudara',
                  subtitle: 'Ikatan yang tumbuh tanpa dipaksa',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  content: '...',
                },
                {
                  chapter: 'IV',
                  title: 'Nilai yang Kita Pegang',
                  subtitle: 'Prinsip tanpa perlu ditulis',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ),
                  content: '...',
                },
                {
                  chapter: 'V',
                  title: 'Apa Itu Tadika, Sebenarnya?',
                  subtitle: 'Lebih dari sekadar grup chat',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  ),
                  content: '...',
                },
              ].map((entry, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '28px 32px',
                    borderBottom: idx < 4 ? '1px solid var(--color-border)' : 'none',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    {/* Chapter number + icon */}
                    <div style={{
                      minWidth: 48,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      paddingTop: 2,
                    }}>
                      <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>{entry.chapter}</span>
                      <div style={{ color: 'var(--color-accent)' }}>{entry.icon}</div>
                    </div>

                    {/* Text content */}
                    <div style={{ flex: 1 }}>
                      <h4 className="font-display" style={{ fontSize: '1.15rem', margin: '0 0 4px' }}>{entry.title}</h4>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-accent)', letterSpacing: '0.03em' }}>{entry.subtitle}</span>
                      <p className="font-body" style={{
                        fontSize: '0.95rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7,
                        marginTop: 12,
                        marginBottom: 0,
                      }}>
                        {entry.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ MARKAS NONGKRONG ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>Markas Nongkrong</h2>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
              {hangoutSpots.length} TITIK MANGKAL
            </span>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Compact header */}
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--color-border)',
              background: 'var(--color-bg-alt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <h3 className="font-display" style={{ fontSize: '0.95rem', margin: 0 }}>Tempat Nongki</h3>
              <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{hangoutSpots.length} spot</span>
            </div>

            {/* Compact list */}
            <div style={{ padding: '8px 0' }}>
              {hangoutSpots.map((spot, idx) => (
                <div
                  key={spot.id}
                  onClick={() => setExpandedHangout(expandedHangout === spot.id ? null : spot.id)}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    padding: '8px 20px',
                    cursor: 'pointer',
                    borderBottom: idx < hangoutSpots.length - 1 ? '1px solid var(--color-border)' : 'none',
                    transition: 'background 0.2s ease',
                    background: expandedHangout === spot.id ? 'var(--color-bg-alt)' : 'transparent',
                  }}
                >
                  {/* Compact pin */}
                  <div style={{
                    minWidth: 28, minHeight: 28,
                    borderRadius: '50%',
                    background: expandedHangout === spot.id ? 'var(--color-text)' : 'var(--color-bg-alt)',
                    border: '1.5px solid var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={expandedHangout === spot.id ? 'var(--color-bg)' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', transform: expandedHangout === spot.id ? 'rotate(90deg)' : 'none' }}>
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>#{String(spot.id).padStart(2, '0')}</span>
                      <span className="font-display" style={{ fontSize: '0.9rem' }}>{spot.name}</span>
                      <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--color-accent)', marginLeft: 'auto', flexShrink: 0 }}>{spot.vibe}</span>
                    </div>

                    {/* Expandable detail */}
                    {expandedHangout === spot.id && (
                      <p className="font-body" style={{
                        fontSize: '0.8rem', color: 'var(--color-text-secondary)',
                        lineHeight: 1.5, margin: '6px 0 2px',
                        paddingLeft: 4, borderLeft: '2px solid var(--color-accent)',
                      }}>
                        {spot.detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════ TRIP WIKI ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>Timeline Main</h2>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
              {tripData.length} KASUS TERCATAT
            </span>
          </div>

          <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
            {/* Split layout: Sidebar for navigation, Main for content */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>

              {/* Sidebar Navigation */}
              <div style={{ flex: '1 1 250px', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-alt)' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
                  <h3 className="font-mono" style={{ fontSize: '1rem' }}>Daftar Perjalanan</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {tripData.map((trip, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveWikiIndex(idx)}
                      style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        background: activeWikiIndex === idx ? 'var(--color-surface)' : 'transparent',
                        border: 'none',
                        borderBottom: '1px solid var(--color-border)',
                        cursor: 'pointer',
                        borderLeft: activeWikiIndex === idx ? '4px solid var(--color-text)' : '4px solid transparent',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div className="font-display" style={{ fontSize: '1.2rem', fontWeight: 600, color: activeWikiIndex === idx ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>
                        {trip.title}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                        {trip.date} • {trip.photos} Foto
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div style={{ flex: '3 1 600px', padding: '32px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div style={{ position: 'relative', width: '100%', height: '350px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 24 }}>
                  <TripSlideshow category={activeTrip.title} fallbackImg={activeTrip.img} mediaList={mediaList} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                    <div className="font-mono text-white" style={{ fontSize: '1rem', marginBottom: 8, opacity: 0.9 }}>{activeTrip.date}</div>
                    <h2 className="font-display text-white" style={{ fontSize: '2.5rem', color: 'white' }}>{activeTrip.title}</h2>
                  </div>
                </div>




                <div style={{ marginBottom: 32 }}>
                  <h3 className="font-mono" style={{ fontSize: '1.2rem', marginBottom: 12 }}>Rangkuman</h3>
                  <p className="font-body" style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {activeTrip.desc}
                  </p>
                </div>

                <div className="card" style={{ padding: 32, marginTop: 24 }}>
                  <h3 className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.05em', marginBottom: 16, color: 'var(--color-accent)' }}>DOKSLI:</h3>
                  <div className="font-body" style={{ color: 'var(--color-text)' }}>
                    {activeTrip.detail.split('---').map((part, index) => {
                      const isDialog = index % 2 === 1;
                      return (
                        <div key={index} style={{
                          padding: isDialog ? '16px 0' : '0',
                          margin: isDialog ? '16px 0' : '0',
                          borderTop: isDialog ? '1px dashed var(--color-border)' : 'none',
                          borderBottom: isDialog ? '1px dashed var(--color-border)' : 'none',
                          whiteSpace: 'pre-wrap',
                          fontFamily: isDialog ? 'monospace' : 'inherit',
                          fontSize: isDialog ? '0.9rem' : '1.05rem',
                          color: isDialog ? 'var(--color-text-secondary)' : 'var(--color-text)',
                          lineHeight: 1.6
                        }}>
                          {part.trim()}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
