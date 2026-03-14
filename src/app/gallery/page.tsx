'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

/* ── Gallery photo data ── */
const categories = ['Semua', 'Bandung 1', 'Pangandaran', 'Puncak Bogor', 'Gunung Putri', 'Blok M', 'Lembang', 'Throwback', 'Random'];

const photos = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', alt: 'Pantai sunset', cat: 'Pangandaran', h: 360 },
  { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80', alt: 'Ombak biru', cat: 'Pangandaran', h: 240 },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80', alt: 'Gunung salju', cat: 'Gunung Putri', h: 320 },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80', alt: 'Danau tenang', cat: 'Puncak Bogor', h: 280 },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80', alt: 'Sunrise bukit', cat: 'Lembang', h: 340 },
  { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80', alt: 'Co-working space', cat: 'Blok M', h: 240 },
  { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80', alt: 'Festival malam', cat: 'Bandung 1', h: 300 },
  { src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&q=80', alt: 'Travel road', cat: 'Gunung Putri', h: 260 },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', alt: 'Pantai tropis', cat: 'Pangandaran', h: 320 },
  { src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80', alt: 'Venice canal', cat: 'Bandung 1', h: 280 },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', alt: 'Mountain peak', cat: 'Puncak Bogor', h: 360 },
  { src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80', alt: 'Camera shot', cat: 'Random', h: 240 },
  { src: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=600&q=80', alt: 'Kampus sore', cat: 'Throwback', h: 300 },
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80', alt: 'Gedung kampus', cat: 'Throwback', h: 280 },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', alt: 'Hutan pagi', cat: 'Lembang', h: 340 },
  { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80', alt: 'City night', cat: 'Blok M', h: 260 },
  { src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&q=80', alt: 'Pantai pasir', cat: 'Pangandaran', h: 300 },
  { src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80', alt: 'Laut biru', cat: 'Pangandaran', h: 280 },
  { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80', alt: 'Wisuda kampus', cat: 'Random', h: 320 },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80', alt: 'Konser malam', cat: 'Bandung 1', h: 260 },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([]);

  useEffect(() => {
    const fetchUploadedMedia = async () => {
      try {
        const res = await fetch('/api/media');
        if (res.ok) {
          const data = await res.json();
          // Map to gallery format
          const mappedData = data.map((item: any) => {
            let cat = item.category;
            // Fix old lowercased or deprecated categories
            if (cat.toLowerCase() === 'random') cat = 'Random';
            if (cat.toLowerCase() === 'throwback') cat = 'Throwback';
            if (cat.toLowerCase() === 'pantai') cat = 'Pangandaran';
            if (cat.toLowerCase() === 'gunung') cat = 'Gunung Putri';
            if (cat.toLowerCase() === 'kota') cat = 'Blok M';

            return {
              src: item.url,
              alt: item.title || item.id,
              cat: cat,
              h: 300 // default height for uploaded photos
            };
          });
          setUploadedPhotos(mappedData);
        }
      } catch (err) {
        console.error('Failed to fetch media:', err);
      }
    };
    fetchUploadedMedia();
  }, []);

  const allPhotos = [...uploadedPhotos, ...photos];
  const filteredPhotos = activeFilter === 'Semua'
    ? allPhotos
    : allPhotos.filter((p) => p.cat === activeFilter);

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
        <section style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div ref={scrollRevealRef} className="reveal-section" style={{ flex: '1 1 500px' }}>
            <h1 className="font-display" style={{ marginBottom: 12 }}>Galeri Foto</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600 }}>
              Kumpulan foto/video momen Tadika. Tinggal filter aja buat nyari foto mana yang mau lu liat.
            </p>
          </div>
          <div ref={scrollRevealRef} className="reveal-section" style={{ animationDelay: '0.1s' }}>
            <Link href="/upload" className="nav-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--color-text)', color: 'var(--color-bg)', border: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Media
            </Link>
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
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={photo.h}
                  style={{ width: '100%', height: photo.h, objectFit: 'cover', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={50}
                />
                <div className="masonry-overlay">
                  <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    {photo.alt}
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
              <p className="font-display" style={{ fontSize: '1.4rem', marginBottom: 8 }}>Yahhh masih kosong :(</p>
              <p className="font-mono" style={{ fontSize: '0.85rem' }}>Belum ada foto di kategori ini nih, coba cek yang lain yak.</p>
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
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              className="lightbox-img"
              width={1200}
              height={800}
              quality={80}
              style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxHeight: '85vh', maxWidth: '90vw' }}
              unoptimized={false}
            />

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
