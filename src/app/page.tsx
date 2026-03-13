'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

/* ── Unsplash gallery images (featured masonry) ── */
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', alt: 'Pantai sunset', h: 360 },
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

/* ── Recent trips data ── */
const recentTrips = [
  {
    title: 'Pangandaran Trip',
    date: 'Des 2025',
    desc: 'Weekend seru di pantai selatan. Snorkeling, sunset, dan api unggun.',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    photos: 126,
  },
  {
    title: 'Gunung Papandayan',
    date: 'Okt 2025',
    desc: 'Pendakian 2 hari ke kawah dan padang edelweiss.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    photos: 89,
  },
  {
    title: 'Jakarta Hangout',
    date: 'Sep 2025',
    desc: 'Jalan-jalan kota, café hopping, dan museum malam.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    photos: 54,
  },
];

/* ── Stats ── */
const stats = [
  { value: '1,240+', label: 'Foto', icon: '📸' },
  { value: '86', label: 'Video', icon: '🎬' },
  { value: '12', label: 'Trips', icon: '✈️' },
  { value: '24', label: 'Anggota', icon: '👥' },
];

export default function Home() {
  const [pixelCells, setPixelCells] = useState<React.ReactNode[]>([]);

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

      {/* Blob SVG decoration - left */}
      <div className="blob-decoration" style={{ top: '20%', left: -60 }}>
        <svg width="200" height="300" viewBox="0 0 200 300">
          <path d="M50,20 Q120,0 150,80 Q180,160 130,220 Q80,280 30,230 Q-20,180 20,100 Q40,40 50,20Z" className="animate-draw" />
        </svg>
      </div>

      {/* Blob SVG decoration - right */}
      <div className="blob-decoration" style={{ top: '10%', right: -40 }}>
        <svg width="180" height="350" viewBox="0 0 180 350">
          <path d="M90,10 Q160,30 160,120 Q160,200 120,260 Q80,320 40,280 Q0,240 20,160 Q40,80 90,10Z" className="animate-draw delay-3" />
        </svg>
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ═══════════ HERO SECTION ═══════════ */}
        <section style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '75vh', textAlign: 'center', gap: 24,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24, maxWidth: '100%' }}>
            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/tadikatext.svg" alt="Tadika" style={{ display: 'block', maxWidth: '100%', height: 'auto', maxHeight: 400, margin: '0 auto', marginTop: 20 }} />
            </div>
          </div>

          {/* Year badge */}
          <div className="font-mono" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginTop: 5, color: 'var(--color-text-muted)' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)' }}>20</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>22</span>
            <span style={{ fontSize: '0.9rem' }}>until</span>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)' }}>20</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>26</span>
          </div>
          <span className="font-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--color-text-muted)' }}>
            /TADIKA ARCHIVE
          </span>
        </section>

        {/* ═══════════ ACTION BUTTONS ═══════════ */}
        <section style={{ paddingBottom: 40, paddingTop: 20 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
            <Link href="/gallery" className="btn btn-primary">Lihat Galeri →</Link>
            <Link href="/upload" className="btn btn-outline">Upload Foto</Link>
          </div>
        </section>

        {/* ═══════════ FEATURED GALLERY (MASONRY) ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="badge badge-accent font-mono" style={{ marginBottom: 8, display: 'inline-block' }}>FEATURED</span>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: '100%', height: img.h, objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                <div className="masonry-overlay">
                  <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ STATS SECTION ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} ref={scrollRevealRef} className="stat-card reveal-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value font-display">{stat.value}</span>
                <span className="stat-label font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ RECENT TRIPS ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="badge badge-dark font-mono" style={{ marginBottom: 8, display: 'inline-block' }}>RECENT</span>
              <h2 className="font-display" style={{ marginTop: 8 }}>Trip Terbaru</h2>
            </div>
            <Link href="/trips" className="font-mono" style={{ fontSize: '0.85rem', letterSpacing: '0.05em', color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: 4 }}>
              SEMUA TRIP →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {recentTrips.map((trip, i) => (
              <div key={i} ref={scrollRevealRef} className="card trip-card reveal-item" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="trip-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={trip.img} alt={trip.title} loading="lazy" />
                </div>
                <div className="trip-card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span className="badge badge-accent font-mono">{trip.date}</span>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{trip.photos} foto</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.3rem', marginBottom: 6 }}>{trip.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{trip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ KATEGORI GALERI (existing cards) ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 80 }}>
          <h2 className="font-display" style={{ marginBottom: 24 }}>Kategori Galeri</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <Link href="/gallery/pantai" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300 }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/pgdn.jpg" alt="Pantai Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Pantai Collection</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>48 foto dan video dari trip pantai bersama sirkel.</p>
              </div>
            </Link>

            <Link href="/gallery/gunung" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" alt="Gunung Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Gunung Collection</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>35 foto dan video dari pendakian dan camping.</p>
              </div>
            </Link>

            <Link href="/gallery/kota" className="card reveal-item" ref={scrollRevealRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 300, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" alt="Kota Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />
              </div>
              <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
                <h3 className="font-display" style={{ marginBottom: 8, color: '#FFFFFF' }}>Kota Collection</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>62 foto dan video hangout di kota.</p>
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
