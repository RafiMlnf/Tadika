'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { members } from '@/data/members';

export default function ProfilePage() {
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

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, paddingBottom: 100 }}>
        {/* ═══════════ HEADER ═══════════ */}
        <section style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div ref={scrollRevealRef} className="reveal-section">
            <span className="badge badge-accent font-mono" style={{ marginBottom: 12, display: 'inline-block' }}>
              ANGGOTA
            </span>
            <h1 className="font-display" style={{ marginBottom: 12 }}>Profil</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600 }}>
              Kenalan dengan wajah-wajah di balik layar Tadika Archive. Dari tukang foto sampai navigator tersesat.
            </p>
          </div>
        </section>

        {/* ═══════════ MEMBERS GRID ═══════════ */}
        <section>
          <div className="profile-grid">
            {members.map((member, i) => (
              <Link 
                href={`/profile/${member.id}`} 
                key={member.id} 
                ref={scrollRevealRef}
                className="reveal-item profile-card card block"
                style={{ animationDelay: `${i * 0.1}s`, textDecoration: 'none', color: 'inherit' }}
              >
                <div className="profile-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="profile-role-badge font-mono">{member.role}</div>
                </div>
                <div className="profile-card-content">
                  <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: 4 }}>{member.name}</h3>
                  <p className="font-mono text-muted" style={{ fontSize: '0.8rem', marginBottom: 16 }}>Since {member.joinYear}</p>
                  
                  <blockquote className="profile-quote">
                    {member.quote}
                  </blockquote>
                  
                  <div className="profile-stats-mini">
                    <div>
                      <span className="font-mono">{member.stats.trips}</span>
                      <small>Trips</small>
                    </div>
                    <div>
                      <span className="font-mono">{member.stats.photos}</span>
                      <small>Photos</small>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
