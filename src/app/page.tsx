'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const [pixelCells, setPixelCells] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Generate scattered pixels that are spaced out (no touching borders or corners)
    const cols = Math.ceil(window.innerWidth / 40);
    const rows = Math.ceil(window.innerHeight / 40);

    const grid = Array.from({ length: rows }, () => Array(cols).fill(false));
    const cells: React.ReactNode[] = [];

    // Fill around 12% of all possible grid intersections to make it denser
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

      if (isTaken || hasUp || hasDown || hasLeft || hasRight || hasTL || hasTR || hasBL || hasBR) {
        continue;
      }

      grid[r][c] = true;
      const delay = (Math.random() * 20).toFixed(2);
      const duration = (10 + Math.random() * 20).toFixed(2);

      cells.push(
        <div
          key={`${r}-${c}`}
          className="pixel-bg-cell"
          style={{
            position: 'absolute',
            top: r * 40,
            left: c * 40,
            width: 40,
            height: 40,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    }

    setPixelCells(cells);
  }, []);

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', position: 'relative' }}>
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
        {/* Hero Section */}
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '75vh',
          textAlign: 'center',
          gap: 24,
        }}>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            gap: 24,
            maxWidth: '100%'
          }}>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              maxWidth: '100%'
            }}>
              <div style={{
                position: 'absolute',
                top: 25,
                bottom: 25,
                left: 25,
                right: 25,
                backgroundColor: 'var(--color-text)',
                zIndex: -1
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/tadikatext.svg"
                alt="Tadika"
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: 400,
                }}
              />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-retro)',
                color: 'var(--color-text)',
                fontSize: '2.5rem',
                lineHeight: 1,
                marginLeft: 26,
                letterSpacing: '0.02em',
                textTransform: 'lowercase',
                marginTop: -10,
              }}
            >
              an archive
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/gallery" className="btn btn-primary">Lihat Galeri →</Link>
            <Link href="/upload" className="btn btn-outline">Upload Foto</Link>
          </div>

          {/* Year badge */}
          <div className="font-mono" style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: 8,
            marginTop: 32,
            color: 'var(--color-text-muted)',
          }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)' }}>20</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>22</span>
            <span style={{ fontSize: '0.9rem' }}>until</span>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)' }}>20</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>26</span>
          </div>
          <span className="font-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--color-text-muted)' }}>
            /SIRKEL ARCHIVE
          </span>
        </section>

        {/* Card Preview */}
        <section style={{ paddingBottom: 80 }}>
          <h2 className="font-display" style={{ marginBottom: 24 }}>Kategori Galeri</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {/* Card 1 */}
            <Link href="/gallery/pantai" className="card" style={{ padding: 24 }}>
              <h3 className="font-display" style={{ marginBottom: 8 }}>Pantai Collection</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                48 foto dan video dari trip pantai bersama sirkel.
              </p>
            </Link>

            {/* Card 2 */}
            <Link href="/gallery/gunung" className="card" style={{ padding: 24 }}>
              <h3 className="font-display" style={{ marginBottom: 8 }}>Gunung Collection</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                35 foto dan video dari pendakian dan camping.
              </p>
            </Link>

            {/* Card 3 */}
            <Link href="/gallery/kota" className="card" style={{ padding: 24 }}>
              <h3 className="font-display" style={{ marginBottom: 8 }}>Kota Collection</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                62 foto dan video hangout di kota.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
