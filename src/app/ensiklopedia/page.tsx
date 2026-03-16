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
  { year: '2024', month: 'Agt', event: 'Blok M — Anak skena dadakan, ngemper gembel di kota raya.', icon: '05' },
  { year: '2025', month: 'Jan', event: 'Lembang — One day trip, isinya numpang makan doang kagak ada ujungnya.', icon: '06' },
];

/* ── Trip Wiki data ── */
const tripData = [
  {
    title: 'Bandung 1',
    date: 'Mar 2022',
    tags: ['Awal Mula', 'City Stroll', 'Roadtrip'],
    desc: "Awalnya wacana motoran ke Gedebage gara-gara Dafa ngajak Rafi nge-thrift. Ujungnya rencana berubah jadi ke Bandung dan Dzaki pun jadi MVP karena ikut H-2 masuk squadlist Timnas Tadika.",
    detail: `suatu hari dikelas, rafi seseorang yang menyedihkan, tiba-tiba dihampiri oleh dafa alfiana. dafa ngajak ngobrol, 
---
bro said : fi, nge thrift yo ke gedebage bandung motoran
rafi     : ayo, ajak yang lain juga yo biar ramean
bro dafa : gas
---
lalu si keren rafi menyusun dan mengajak yang lain. tapi... setelah semua tersusun, ter-plan rapih, dihari yg panas dikelas, dafa menghampiri.
---
dafa : fi kayanya gua gabisa (lupa alesan nya apa njir).
rafi : damn okoklah
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
    detail: `selang semesteran after bandung 1, ada usulan villa-an lagi tapi ke bogor. cuma partisipan nya kyknya dikit, yaudah geser plan extreme, berbahaya, yang mungkin dapat menyebabkan kematian, bahkan orang manapun mungkin tidak bisa (ymma). pangandaran, usulan konyol yang suprisingly ada yang minat, keren2. dengan keterbatasan anggota yg ikut tapi terjadi meski menantang batas kemampuan mental dan batin rata2 manusia UPB. bretttt baliknya ilang setengah nyawa dan akal sehat.`,
    img: '/img/pgdn.jpg',
    photos: 126,
  },
  {
    title: 'Puncak Bogor',
    date: 'Des 2023',
    tags: ['Villa', 'Ngemper', 'Gathering'],
    desc: 'Ngerayain pergantian taun di villa Puncak dengan view lumayan lah buat dibikin story IG pamer pamer dikit.',
    detail: `kebersamaan cenah, biar ga tadika2 aja, kawan2 pengen adain acara sekelas, dimas, rafi, fajri telah pidato di grup A4 tapi gaada yg jawab, dahlah ujungnya mah tadika2 lagi. tour yg membangun chemistry tadika, emang ada yg masi asing pas di loc, tapi lihatlah sekarang. tour ter-goated.`,
    img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    photos: 67,
  },
  {
    title: 'Gunung Putri',
    date: 'Apr 2024',
    tags: ['Sok Pecinta Alam', 'Hiking', 'Stargazing'],
    desc: 'Sok asik main ke alam, nanjak cimit doang capeknya ngga ngotak, ujung-ujungnya cuma pgn rebahan doang.',
    detail: `dibilang trip bukan, dibilang filler juga bukan soalnya jauh, plan awalnya mau sawarna / goa langir banten, brett ada berita megathrust (siapa yg kaga takut coba diancam tsunami). yaudahlah geser ke gunung2an biar ga kena tsunami, bro ricky nyari2 rekomen tempat camping, nemu tu opsi loji atau gn putri, hasil vote gn putri menang. tour paling murah, ga pusing mikirin biaya, makanya biar rame lagi ngajak bro dimas dan raka, tapi si hafiz hampir gamau soalnya dia udah join satset (gasih, karena gaada ongkos wkwk), tapi terimakasih gita telah membujuk hapis.`,
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    photos: 89,
  },
  {
    title: 'Blok M',
    date: 'Agt 2024',
    tags: ['Skena', 'Nongkrong', 'Thrift'],
    desc: 'Sok skena muterin Blok M. Rutenya nge-thrift gajelas, mampir cafe overprice ga ngotak, trus kelayapan jajan.',
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
            <span className="badge badge-accent font-mono" style={{ marginBottom: 12, display: 'inline-block' }}>
              TADIKAPEDIA
            </span>
            <h1 className="font-display" style={{ marginBottom: 16 }}>Ensiklopedia Tadika</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
              Semua hal absurd yang butuh lu tau tentang bader-bader ini. Mulai dari kronologi kejadian awal, kelakuan minus, sampe arsip aib terekam jelas di mari.
            </p>
          </div>
        </section>

        {/* ═══════════ KARTU SEJARAH + TIMELINE ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 48 }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent)' }}>00</span>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.5rem', margin: 0, lineHeight: 1.2 }}>
                    Awal Mula Bencana
                  </h3>
                  <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--color-accent)', letterSpacing: '0.03em' }}>
                    Sejarah Tadika
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 32 }}>
                Dibuat sama Akram Satya tanggal 30 September 2022. Dengan nama awal Grup Belajar, karena pengen punya grup juga kaya Good Student. Ngambil nama dari TK Upin Ipin, nama Grup Belajar berubah jadi Tadika Mesra. Tapi suatu hari rezim Akram dan jajarannya dikudeta oleh Ricky dan jajarannya (bro dijadiin admin ama owner, somehow bisa demote owner).
              </p>

              <h4 className="font-mono" style={{ fontSize: '0.9rem', marginBottom: 16, letterSpacing: '0.05em', color: 'var(--color-text)' }}>REKAMAN KELAYAPAN (TIMELINE):</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {timelineEvents.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--color-bg-alt)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                    <span className="font-mono" style={{ fontWeight: 800, color: 'var(--color-accent)' }}>{item.icon}</span>
                    <div>
                      <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>{item.month} {item.year}</div>
                      <div className="font-body" style={{ fontSize: '0.95rem', color: 'var(--color-text)', margin: 0 }}>{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ ENSIKLOPEDIA UMUM (Card Grid) ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>Buku Suci Tadika</h2>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
              {encyclopediaSections.length} ENTRI MENGANDUNG AIB
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {encyclopediaSections.map((section, i) => (
              <div
                key={section.id}
                ref={scrollRevealRef}
                className="card reveal-item"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onClick={() => setExpandedCard(expandedCard === section.id ? null : section.id)}
              >
                {/* Card Header */}
                <div style={{
                  padding: '24px 24px 16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>{section.icon}</span>
                    <div>
                      <h3 className="font-display" style={{ fontSize: '1.2rem', margin: 0, lineHeight: 1.2 }}>
                        {section.title}
                      </h3>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-accent)', letterSpacing: '0.03em' }}>
                        {section.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Preview text (expandable via WebkitLineClamp) */}
                  <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: expandedCard === section.id ? 'unset' : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: expandedCard === section.id ? 'visible' : 'hidden',
                    transition: 'all 0.3s ease',
                  } as React.CSSProperties}>
                    {section.content}
                  </p>
                </div>

                {/* Expand indicator */}
                <div style={{
                  padding: '8px 24px 12px',
                  textAlign: 'center',
                }}>
                  <span className="font-mono" style={{
                    fontSize: '0.7rem',
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.1em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    {expandedCard === section.id ? 'TUTUP' : 'BACA SELENGKAPNYA'}
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{
                        transform: expandedCard === section.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════ TRIP WIKI ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>Jejak Kelayapan</h2>
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

                <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                  {activeTrip.tags.map(tag => (
                    <span key={tag} className="badge" style={{ background: 'var(--color-bg-alt)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
                      #{tag}
                    </span>
                  ))}
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
