'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Scribbles from '@/components/Scribbles';
import Link from 'next/link';

/* ── Unsplash gallery images (featured masonry) ── */
const galleryImages = [
  { src: '/img/pgdn.jpg', alt: 'Pangandaran', h: 360 },
  { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80', alt: 'Ombak biru', h: 240 },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80', alt: 'Gunung salju', h: 320 },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80', alt: 'Danau tenang', h: 280 },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80', alt: 'Sunrise bukit', h: 340 },
  { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80', alt: 'Co-working space', h: 240 },
  { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80', alt: 'Festival malam', h: 300 },
  { src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&q=80', alt: 'Travel road', h: 260 },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', alt: 'Pantai tropis', h: 320 },
  { src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80', alt: 'Venice canal', h: 280 },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', alt: 'Mountain peak', h: 360 },
  { src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80', alt: 'Camera shot', h: 240 },
];

/* ── Trip Wiki data ── */
const tripWiki = [
  {
    title: 'Bandung 1',
    date: 'Mar 2022',
    desc: 'First trip ke Bandung bareng anak-anak. Mutar-mutar Braga, hunting kuliner hits, dan pastinya jeprat-jepret estetik.',
    detail: 'Bandung 1 tuh titik awal Tadika terbentuk. Kita gas ke tempat ikonik kayak Braga, Gedung Sate, dan TSM. Pokoknya momen ini jadi core memory kita semua sampai sekarang.',
    img: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80',
    photos: 84,
  },
  {
    title: 'Pangandaran',
    date: 'Jul 2023',
    desc: 'Weekend getaway ke pantai selatan yang pecah banget. Ada snorkeling, chilling liat sunset, plus deep talk rill depan api unggun.',
    detail: 'Salah satu trip paling goated! Kita enjoy mantai pasir putih, nyebur di Green Canyon, sampai nge-gitar sambil api unggun. Vibes-nya asik abis.',
    img: '/img/pgdn.jpg',
    photos: 126,
  },
  {
    title: 'Puncak Bogor',
    date: 'Des 2023',
    desc: 'Vibing akhir tahun di villa Puncak dengan view yang sick parah.',
    detail: 'Puncak Bogor jadi spot gathering penutup tahun. Nge-chill di villa, BBQ-an bareng, turnamen mini games, plus nangkring nungguin sunrise dari balkon.',
    img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    photos: 67,
  },
  {
    title: 'Gunung Putri',
    date: 'Apr 2024',
    desc: 'Light hiking plus nge-camp chill sambil stargazing.',
    detail: 'First time nyobain outdoor life buat anak-anak kota. Kita bangun tenda (capek no debat), masak bareng, dan nyantai di bawah bintang. Sunrise pas pagi? No kecot legit banget.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    photos: 89,
  },
  {
    title: 'Blok M',
    date: 'Agt 2024',
    desc: 'City stroll vibes Blok M. Mulai dari nge-thrift, café hopping estetik, sampai hunting kuliner malem.',
    detail: 'Ngeksplor Blok M bareng gengs. Ngubek-ngubek M Bloc, pindah-pindah café, jajan street food di Blok M Square, lanjut nongkrong sambil curhat ngalor-ngidul.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    photos: 54,
  },
  {
    title: 'Lembang',
    date: 'Jan 2025',
    desc: 'One day escape ke Lembang ngadem sambil hunting kuliner lokal yang maknyus.',
    detail: 'Trip singkat super fun! Kita mampir ke Floating Market, exploring The Lodge Maribaya, terus mukbang sate maranggi. Vibes sejuk plus ngakak-ngakak bareng.',
    img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    photos: 72,
  },
];

/* ── Stats ── */
const stats = [
  { value: '1,240+', label: 'Foto' },
  { value: '86', label: 'Video' },
  { value: '12', label: 'Trips' },
  { value: '20', label: 'Legenda' },
];

export default function Home() {
  const [pixelCells, setPixelCells] = useState<React.ReactNode[]>([]);
  const [activeTrip, setActiveTrip] = useState<typeof tripWiki[0] | null>(null);

  /* ── Pixel background generation ── */
  useEffect(() => {
    const cols = Math.ceil(window.innerWidth / 40);
    const rows = Math.ceil(window.innerHeight / 40);
    const grid = Array.from({ length: rows }, () => Array(cols).fill(false));
    const cells: React.ReactNode[] = [];
    const targetCells = Math.floor(rows * cols * 0.12);
    let attempts = 0;

    while (cells.length < targetCells && attempts < targetCells * 50) {
      attempts++;
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      const isTaken = grid[r][c];
      const hasUp = r > 0 && grid[r - 1][c];
      const hasDown = r < rows - 1 && grid[r + 1][c];
      const hasLeft = c > 0 && grid[r][c - 1];
      const hasRight = c < cols - 1 && grid[r][c + 1];
      const hasTL = r > 0 && c > 0 && grid[r - 1][c - 1];
      const hasTR = r > 0 && c < cols - 1 && grid[r - 1][c + 1];
      const hasBL = r < rows - 1 && c > 0 && grid[r + 1][c - 1];
      const hasBR = r < rows - 1 && c < cols - 1 && grid[r + 1][c + 1];
      if (isTaken || hasUp || hasDown || hasLeft || hasRight || hasTL || hasTR || hasBL || hasBR) continue;
      grid[r][c] = true;
      const delay = (Math.random() * 20).toFixed(2);
      const duration = (10 + Math.random() * 20).toFixed(2);
      cells.push(
        <div key={`${r}-${c}`} className="pixel-bg-cell" style={{ position: 'absolute', top: r * 40, left: c * 40, width: 40, height: 40, animationDelay: `${delay}s`, animationDuration: `${duration}s` }} />
      );
    }
    setPixelCells(cells);
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
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
    }
    observerRef.current.observe(node);
  }, []);

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', position: 'relative', marginTop: '-80px', paddingTop: '80px' }}>
      {/* Background Pixel Animation */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8, pointerEvents: 'none', overflow: 'hidden' }}>
        {pixelCells}
      </div>

      <Navbar />

      <Scribbles />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ═══════════ HERO SECTION ═══════════ */}
        <section style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '25vh', textAlign: 'center', gap: 8,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24, maxWidth: '100%' }}>
            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/tadikatext.svg" alt="Tadika" style={{ display: 'block', maxWidth: '100%', height: 'auto', maxHeight: 280, margin: '0 auto', marginTop: 40 }} />
            </div>
          </div>

          {/* Year badge */}
          <div className="font-mono" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginTop: 5, color: 'var(--color-text-muted)' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)' }}>20</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>22</span>
            <span style={{ fontSize: '0.9rem' }}>until</span>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)' }}>Infinity</span>
          </div>
          <span className="font-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--color-text-muted)' }}>
            /TADIKA ARCHIVES
          </span>
        </section>

        {/* ═══════════ ACTION BUTTONS ═══════════ */}
        <section style={{ paddingBottom: 60, paddingTop: 20 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
            <Link href="/profile" className="btn btn-outline">Profil</Link>
          </div>
        </section>

        {/* ═══════════ MARQUEE (TAPE) ═══════════ */}
        <section style={{ position: 'relative', width: '110vw', left: '50%', right: '50%', marginLeft: '-55vw', marginRight: '-55vw', padding: '16px 0', background: 'var(--color-text)', color: 'var(--color-bg)', transform: 'rotate(-2deg)', marginBottom: 100, zIndex: 10, overflow: 'hidden', borderTop: '2px solid var(--color-border)', borderBottom: '2px solid var(--color-border)' }}>
          <div className="marquee-container font-mono" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            <div className="marquee-content" style={{ fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
              ✦ TADIKA MEMORIES ✦ MEMORIES ✦ 2022-∞ ✦ FRIENDS ✦ JOURNEYS ✦ EST. 2022 ✦ TADIKA MEMORIES ✦ MEMORIES ✦ 2022-∞ ✦ FRIENDS ✦ JOURNEYS ✦ EST. 2022 ✦
            </div>
            <div className="marquee-content" style={{ fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
              ✦ TADIKA MEMORIES ✦ MEMORIES ✦ 2022-∞ ✦ FRIENDS ✦ JOURNEYS ✦ EST. 2022 ✦ TADIKA MEMORIES ✦ MEMORIES ✦ 2022-∞ ✦ FRIENDS ✦ JOURNEYS ✦ EST. 2022 ✦
            </div>
          </div>
        </section>

        {/* ═══════════ FEATURED GALLERY (MASONRY) ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 className="font-display" style={{ marginTop: 8 }}>Galeri Pilihan</h2>
            </div>
            <Link href="/gallery" className="font-mono" style={{ fontSize: '0.85rem', letterSpacing: '0.05em', color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: 4 }}>
              LIHAT SEMUA →
            </Link>
          </div>

          <div className="masonry-grid">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                ref={scrollRevealRef}
                className="reveal-item media-wrapper"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: '100%', height: img.h, objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ STATS SECTION ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} ref={scrollRevealRef} className="stat-card reveal-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="stat-value font-display">{stat.value}</span>
                <span className="stat-label font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ TRIP WIKI ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 className="font-display" style={{ marginTop: 8 }}>Trip Wiki</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {tripWiki.map((trip, i) => (
              <div key={i} ref={scrollRevealRef} className="card trip-card reveal-item" style={{ animationDelay: `${i * 0.12}s`, cursor: 'pointer' }} onClick={() => setActiveTrip(trip)}>
                <div className="trip-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={trip.img} alt={trip.title} loading="lazy" />
                </div>
                <div className="trip-card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                    <h3 className="font-display" style={{ fontSize: '1.3rem', margin: 0 }}>{trip.title}</h3>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 6 }}>{trip.photos} foto</span>
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--color-accent)', marginBottom: 8 }}>{trip.date}</div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{trip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ GALERI (scrollable cards) ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <h2 className="font-display" style={{ marginBottom: 24 }}>Galeri</h2>
          <div style={{ display: 'flex', gap: 20, overflowX: 'auto', padding: '16px 16px 32px 16px', margin: '-16px -16px 0 -16px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }} className="gallery-scroll-container">
            {/* 1. Bandung 1 */}
            <Link href="/gallery/bandung-1" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80" alt="Bandung 1" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Bandung 1</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>First trip ke Bandung bareng gengs Tadika. Vibesnya dapet!</p>
              </div>
            </Link>

            {/* 2. Pangandaran */}
            <Link href="/gallery/pangandaran" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/pgdn.jpg" alt="Pangandaran" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Pangandaran</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>48 foto dan video dari mantai seru bareng Tadika.</p>
              </div>
            </Link>

            {/* 3. Puncak Bogor */}
            <Link href="/gallery/puncak-bogor" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80" alt="Puncak Bogor" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Puncak Bogor</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>Momen pecah di Puncak bareng anak-anak. Seru abis!</p>
              </div>
            </Link>

            {/* 4. Gunung Putri */}
            <Link href="/gallery/gunung-putri" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" alt="Gunung Putri" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Gunung Putri</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>35 foto dan video pas hiking dan camping cantik.</p>
              </div>
            </Link>

            {/* 5. Blok M */}
            <Link href="/gallery/blok-m" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" alt="Blok M" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Blok M</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>62 foto dan video city stroll hangout di kota.</p>
              </div>
            </Link>

            {/* 6. Lembang */}
            <Link href="/gallery/lembang" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" alt="Lembang" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Lembang</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>Jalan-jalan ngadem asik di Lembang bareng gengs.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* ═══════════ TRIP WIKI MODAL ═══════════ */}
      {activeTrip && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'fadeIn 0.25s ease-out' }}
          onClick={() => setActiveTrip(null)}
        >
          <div
            style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', maxWidth: 600, width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative', animation: 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)', border: '1.5px solid var(--color-border-light)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveTrip(null)}
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, width: 40, height: 40, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.4)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeTrip.img} alt={activeTrip.title} style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

            {/* Content */}
            <div style={{ padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <span className="badge badge-accent font-mono">{activeTrip.date}</span>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{activeTrip.photos} foto</span>
              </div>
              <h2 className="font-display" style={{ fontSize: '1.8rem', marginBottom: 12 }}>{activeTrip.title}</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>{activeTrip.detail}</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />
    </div>
  );
}
