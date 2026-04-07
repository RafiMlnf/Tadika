'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Scribbles from '@/components/Scribbles';
import Link from 'next/link';
import TripSlideshow from '@/components/TripSlideshow';

/* ── Berita / Hot Topics ── */
const newsItems = [
  {
    id: 1,
    category: '🔥 Hot Topic',
    title: 'Trip Selanjutnya Kemana?',
    summary: 'Poll resmi sudah dibuka! Pilihan antara Jogja, Malang, atau Bali. Vote sekarang sebelum deadline minggu depan.',
    date: '2 Apr 2025',
    isHot: true,
    emoji: '🗳️',
    reactions: { fire: 12, heart: 8, laugh: 3 },
  },
  {
    id: 2,
    category: '📸 Galeri Update',
    title: 'Foto Lembang Sudah Terupload!',
    summary: '72 foto + 15 video dari trip Lembang Januari kemarin sudah masuk arsip. Cek galeri sekarang!',
    date: '28 Mar 2025',
    isHot: false,
    emoji: '🏔️',
    reactions: { fire: 6, heart: 14, laugh: 2 },
  },
  {
    id: 3,
    category: '🎂 Ulang Tahun',
    title: 'HBD Hafiz! 🎉',
    summary: 'Selamat ulang tahun buat Hafiz yang ke-22! Semoga makin sering ikut trip dan makin rajin bayar kas.',
    date: '25 Mar 2025',
    isHot: false,
    emoji: '🎈',
    reactions: { fire: 4, heart: 18, laugh: 9 },
  },
  {
    id: 4,
    category: '💰 Kas Update',
    title: 'Kas Tadika Bulan Ini',
    summary: 'Reminder: yang belum bayar kas bulan Maret, segera transfer. Saldo saat ini cukup buat 1x makan bareng.',
    date: '20 Mar 2025',
    isHot: true,
    emoji: '💸',
    reactions: { fire: 2, heart: 1, laugh: 15 },
  },
  {
    id: 5,
    category: '🏆 Achievement',
    title: 'Tadika Resmi 3 Tahun!',
    summary: 'Dari 2022 sampai sekarang masih solid. 12 trips, 1,240+ foto, dan countless memories. Salute! 🫡',
    date: '15 Mar 2025',
    isHot: false,
    emoji: '🎊',
    reactions: { fire: 20, heart: 22, laugh: 5 },
  },
];

const categoryColors: Record<string, string> = {
  '🔥 Hot Topic': '#FF7E67',
  '📸 Galeri Update': '#699CD2',
  '🎂 Ulang Tahun': '#A084E8',
  '💰 Kas Update': '#FFD166',
  '🏆 Achievement': '#6BCB77',
};




export default function Home() {
  const [pixelCells, setPixelCells] = useState<React.ReactNode[]>([]);

  const [mediaList, setMediaList] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMediaList(data);
      })
      .catch(err => console.error('Failed to load media:', err));
  }, []);

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
              ✦ TADIKA ✦ ARCHIVES ✦ 2022-∞ ✦ FRIENDS ✦ JOURNEYS ✦ EST. 2022 ✦ TADIKA ✦ ARCHIVES ✦ MEMORIES ✦ 2022-∞ ✦ FRIENDS ✦ JOURNEYS ✦ EST. 2022 ✦
            </div>
            <div className="marquee-content" style={{ fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
              ✦ TADIKA ✦ ARCHIVES ✦ 2022-∞ ✦ FRIENDS ✦ JOURNEYS ✦ EST. 2022 ✦ TADIKA ✦ ARCHIVES ✦ MEMORIES ✦ 2022-∞ ✦ FRIENDS ✦ JOURNEYS ✦ EST. 2022 ✦
            </div>
          </div>
        </section>

        {/* ═══════════ BERITA / HOT TOPICS ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 className="font-display" style={{ marginTop: 8 }}>Ada Apa Nih?</h2>
              <p className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginTop: 4 }}>/ BERITA & HOT TOPICS</p>
            </div>
          </div>

          <div className="news-feed" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {newsItems.map((news, i) => (
              <div
                key={news.id}
                ref={scrollRevealRef}
                className="card reveal-item news-card"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  display: 'flex',
                  gap: 20,
                  padding: '24px 28px',
                  alignItems: 'flex-start',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Hot indicator pulse */}
                {news.isHot && (
                  <div style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: '#FF7E67',
                    boxShadow: '0 0 8px rgba(255, 126, 103, 0.6)',
                    animation: 'pixelBlink 1.5s ease-in-out infinite',
                  }} />
                )}

                {/* Emoji Avatar */}
                <div style={{
                  width: 52,
                  height: 52,
                  minWidth: 52,
                  borderRadius: 'var(--radius-md)',
                  background: `${categoryColors[news.category] || 'var(--color-accent)'}18`,
                  border: `1.5px solid ${categoryColors[news.category] || 'var(--color-accent)'}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  {news.emoji}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-pill)',
                        background: `${categoryColors[news.category] || 'var(--color-accent)'}20`,
                        color: categoryColors[news.category] || 'var(--color-accent)',
                        border: `1px solid ${categoryColors[news.category] || 'var(--color-accent)'}35`,
                      }}
                    >
                      {news.category}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                      {news.date}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      margin: '0 0 6px 0',
                      lineHeight: 1.3,
                    }}
                  >
                    {news.title}
                  </h3>

                  <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.55,
                    margin: 0,
                  }}>
                    {news.summary}
                  </p>

                  {/* Reactions */}
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      🔥 {news.reactions.fire}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      ❤️ {news.reactions.heart}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      😂 {news.reactions.laugh}
                    </span>
                  </div>
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
                <TripSlideshow category="Bandung 1" fallbackImg="https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80" mediaList={mediaList} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Bandung 1</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>Dari wacana motoran Gedebage yang nyaris gagal, malah jadi titik awal sejarah ngumpulnya Tadika.</p>
              </div>
            </Link>

            {/* 2. Pangandaran */}
            <Link href="/gallery/pangandaran" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <TripSlideshow category="Pangandaran" fallbackImg="/img/pgdn.jpg" mediaList={mediaList} />
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
                <TripSlideshow category="Puncak Bogor" fallbackImg="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80" mediaList={mediaList} />
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
                <TripSlideshow category="Gunung Putri" fallbackImg="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" mediaList={mediaList} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Gunung Putri</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>35 foto dan video pas hiking dan camping cantik.</p>
              </div>
            </Link>

            {/* 5. Jakarta */}
            <Link href="/gallery/jakarta" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <TripSlideshow category="Jakarta" fallbackImg="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" mediaList={mediaList} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Jakarta</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>62 foto dan video city stroll hangout di kota.</p>
              </div>
            </Link>

            {/* 6. Lembang */}
            <Link href="/gallery/lembang" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, minWidth: 300, flex: '0 0 300px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <TripSlideshow category="Lembang" fallbackImg="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" mediaList={mediaList} />
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



      {/* ═══════════ FOOTER ═══════════ */}
      <Footer />
    </div>
  );
}
