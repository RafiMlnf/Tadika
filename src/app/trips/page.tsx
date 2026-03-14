'use client';

import { useRef, useCallback, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Scribbles from '@/components/Scribbles';

const tripData = [
  {
    title: 'Bandung 1',
    date: 'Mar 2022',
    tags: ['Nostalgia', 'City Stroll', 'Roadtrip'],
    desc: 'First trip ke Bandung bareng anak-anak. Mutar-mutar Braga, hunting kuliner hits, dan pastinya jeprat-jepret estetik.',
    detail: 'Bandung 1 tuh titik awal Tadika terbentuk. Kita gas ke tempat ikonik kayak Braga, Gedung Sate, dan TSM. Pokoknya momen ini jadi core memory kita semua sampai sekarang.',
    img: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80',
    photos: 84,
  },
  {
    title: 'Pangandaran',
    date: 'Jul 2023',
    tags: ['Beach Vibes', 'Sunset', 'Deep Talk'],
    desc: 'Weekend getaway ke pantai selatan yang pecah banget. Ada snorkeling, chilling liat sunset, plus deep talk rill depan api unggun.',
    detail: 'Salah satu trip paling goated! Kita enjoy mantai pasir putih, nyebur di Green Canyon, sampai nge-gitar sambil api unggun. Vibes-nya asik abis.',
    img: '/img/pgdn.jpg',
    photos: 126,
  },
  {
    title: 'Puncak Bogor',
    date: 'Des 2023',
    tags: ['Villa', 'Chill', 'Gathering'],
    desc: 'Vibing akhir tahun di villa Puncak dengan view yang sick parah.',
    detail: 'Puncak Bogor jadi spot gathering penutup tahun. Nge-chill di villa, BBQ-an bareng, turnamen mini games, plus nangkring nungguin sunrise dari balkon.',
    img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    photos: 67,
  },
  {
    title: 'Gunung Putri',
    date: 'Apr 2024',
    tags: ['Camping', 'Hiking', 'Stargazing'],
    desc: 'Light hiking plus nge-camp chill sambil stargazing.',
    detail: 'First time nyobain outdoor life buat anak-anak kota. Kita bangun tenda (capek no debat), masak bareng, dan nyantai di bawah bintang. Sunrise pas pagi? No kecot legit banget.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    photos: 89,
  },
  {
    title: 'Blok M',
    date: 'Agt 2024',
    tags: ['City', 'Culinary', 'Thrift'],
    desc: 'City stroll vibes Blok M. Mulai dari nge-thrift, café hopping estetik, sampai hunting kuliner malem.',
    detail: 'Ngeksplor Blok M bareng gengs. Ngubek-ngubek M Bloc, pindah-pindah café, jajan street food di Blok M Square, lanjut nongkrong sambil curhat ngalor-ngidul.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    photos: 54,
  },
  {
    title: 'Lembang',
    date: 'Jan 2025',
    tags: ['Nature', 'Culinary', 'One Day Trip'],
    desc: 'One day escape ke Lembang ngadem sambil hunting kuliner lokal yang maknyus.',
    detail: 'Trip singkat super fun! Kita mampir ke Floating Market, exploring The Lodge Maribaya, terus mukbang sate maranggi. Vibes sejuk plus ngakak-ngakak bareng.',
    img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    photos: 72,
  },
];

export default function TripsWikiPage() {
  const [activeWikiIndex, setActiveWikiIndex] = useState(0);

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
            <h1 className="font-display" style={{ marginBottom: 16 }}>Ensiklopedia Trip</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
              Sejarah dan story dari setiap perjalanan Tadika. Dari first trip sampai sekarang semuanya kerekam jelas.
            </p>
          </div>
        </section>

        {/* ═══════════ WIKI CONTENT ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section">
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
                <div style={{ position: 'relative', width: '100%', height: '350px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 24 }}>
                  <img src={activeTrip.img} alt={activeTrip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

                <div style={{ padding: 24, background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)', borderLefT: '4px solid var(--color-accent)' }}>
                  <h3 className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.05em', marginBottom: 8 }}>CATATAN SEJARAH:</h3>
                  <p className="font-body" style={{ color: 'var(--color-text)' }}>
                    "{activeTrip.detail}"
                  </p>
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
