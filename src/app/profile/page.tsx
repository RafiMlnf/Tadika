'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            <h1 className="font-display" style={{ marginBottom: 12 }}>Profil</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600 }}>
              Profil warga tadika yang terindikasi keren.
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
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={500}
                      height={500}
                      style={{
                        objectFit: 'cover',
                        objectPosition: `${member.imageOffsetX || 'center'} ${member.imageOffsetY || 'center'}`,
                        width: '100%',
                        height: '100%',
                        transform: member.imageScale ? `scale(${member.imageScale})` : 'none',
                        transformOrigin: `${member.imageOffsetX || 'center'} ${member.imageOffsetY || 'center'}`
                      }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 4}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(135deg, var(--color-border), var(--color-bg))',
                      fontSize: '3rem', fontWeight: 700, color: 'var(--color-text-muted)'
                    }} className="font-display">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="profile-card-content">
                  <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: 4 }}>{member.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════ PAST MEMBERS ═══════════ */}
        <section ref={scrollRevealRef} className="reveal-section" style={{ paddingTop: 48 }}>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 24 }}>
            <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)', display: 'block', marginBottom: 12 }}>PAST MEMBERS</span>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Akram Satya', 'Yudha Devun', 'Azzam Sauqi', 'Hafiz Fatur'].map(name => (
                <span key={name} className="font-display" style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', opacity: 0.6 }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
