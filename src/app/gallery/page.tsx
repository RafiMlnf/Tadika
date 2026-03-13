'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── Gallery photo data ── */
const categories = ['Semua', 'Pantai', 'Gunung', 'Kota', 'Kampus', 'Event'];

const photos = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', alt: 'Pantai sunset', cat: 'Pantai', h: 360 },
  { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80', alt: 'Ombak biru', cat: 'Pantai', h: 240 },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80', alt: 'Gunung salju', cat: 'Gunung', h: 320 },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80', alt: 'Danau tenang', cat: 'Gunung', h: 280 },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80', alt: 'Sunrise bukit', cat: 'Gunung', h: 340 },
  { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80', alt: 'Co-working space', cat: 'Kota', h: 240 },
  { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80', alt: 'Festival malam', cat: 'Event', h: 300 },
  { src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&q=80', alt: 'Travel road', cat: 'Gunung', h: 260 },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', alt: 'Pantai tropis', cat: 'Pantai', h: 320 },
  { src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80', alt: 'Venice canal', cat: 'Kota', h: 280 },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', alt: 'Mountain peak', cat: 'Gunung', h: 360 },
  { src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80', alt: 'Camera shot', cat: 'Event', h: 240 },
  { src: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=600&q=80', alt: 'Kampus sore', cat: 'Kampus', h: 300 },
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80', alt: 'Gedung kampus', cat: 'Kampus', h: 280 },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', alt: 'Hutan pagi', cat: 'Gunung', h: 340 },
  { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80', alt: 'City night', cat: 'Kota', h: 260 },
  { src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&q=80', alt: 'Pantai pasir', cat: 'Pantai', h: 300 },
  { src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80', alt: 'Laut biru', cat: 'Pantai', h: 280 },
  { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80', alt: 'Wisuda kampus', cat: 'Kampus', h: 320 },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80', alt: 'Konser malam', cat: 'Event', h: 260 },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const filteredPhotos = activeFilter === 'Semua'
    ? photos
    : photos.filter((p) => p.cat === activeFilter);

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

  /* ── Lightbox keyboard close ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  /* ── Lightbox navigation ── */
  const currentIndex = lightbox ? filteredPhotos.findIndex(p => p.src === lightbox.src) : -1;

  const goNext = () => {
    if (currentIndex < filteredPhotos.length - 1) {
      const next = filteredPhotos[currentIndex + 1];
      setLightbox({ src: next.src.replace('w=600', 'w=1200').replace('w=400', 'w=1200'), alt: next.alt });
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const prev = filteredPhotos[currentIndex - 1];
      setLightbox({ src: prev.src.replace('w=600', 'w=1200').replace('w=400', 'w=1200'), alt: prev.alt });
    }
  };

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ═══════════ HEADER ═══════════ */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div ref={scrollRevealRef} className="reveal-section">
            <span className="badge badge-accent font-mono" style={{ marginBottom: 12, display: 'inline-block' }}>
              GALLERY
            </span>
            <h1 className="font-display" style={{ marginBottom: 12 }}>Galeri Foto</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600 }}>
              Kumpulan foto dan momen berharga dari perjalanan sirkel. Filter berdasarkan kategori untuk menemukan kenangan spesifik.
            </p>
          </div>
        </section>

        {/* ═══════════ FILTER PILLS ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingBottom: 32 }}>
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`nav-pill gallery-filter-pill ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
                {activeFilter !== 'Semua' && cat === activeFilter && (
                  <span className="filter-count">{filteredPhotos.length}</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ═══════════ MASONRY GRID ═══════════ */}
        <section style={{ paddingBottom: 80 }}>
          <div className="masonry-grid" key={activeFilter}>
            {filteredPhotos.map((photo, i) => (
              <div
                key={`${activeFilter}-${i}`}
                ref={scrollRevealRef}
                className="reveal-item gallery-item media-wrapper"
                style={{ animationDelay: `${i * 0.04}s`, cursor: 'pointer' }}
                onClick={() =>
                  setLightbox({
                    src: photo.src.replace('w=600', 'w=1200').replace('w=400', 'w=1200'),
                    alt: photo.alt,
                  })
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{ width: '100%', height: photo.h, objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                <div className="masonry-overlay">
                  <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    {photo.alt}
                  </span>
                  <span className="badge badge-accent font-mono" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                    {photo.cat}
                  </span>
                </div>
                {/* Zoom icon */}
                <div className="gallery-zoom-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-muted)' }}>
              <p className="font-display" style={{ fontSize: '1.4rem', marginBottom: 8 }}>Belum ada foto</p>
              <p className="font-mono" style={{ fontSize: '0.85rem' }}>Kategori ini masih kosong.</p>
            </div>
          )}
        </section>
      </div>

      {/* ═══════════ LIGHTBOX ═══════════ */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close lightbox">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev */}
            {currentIndex > 0 && (
              <button className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Previous photo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt={lightbox.alt} className="lightbox-img" />

            {/* Next */}
            {currentIndex < filteredPhotos.length - 1 && (
              <button className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Next photo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            {/* Caption */}
            <div className="lightbox-caption font-mono">
              <span>{lightbox.alt}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>{currentIndex + 1} / {filteredPhotos.length}</span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
