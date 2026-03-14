'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/* ── Generate a random squiggly SVG path ── */
function randomPath(width: number, height: number): string {
  const startX = Math.random() * (width * 0.4) + (width * 0.1);
  const startY = Math.random() * (height * 0.2) + 10;
  const segments = Math.floor(Math.random() * 3) + 2;
  let d = `M${startX.toFixed(0)},${startY.toFixed(0)}`;
  let prevY = startY;
  const yStep = height / segments;

  for (let i = 0; i < segments; i++) {
    const cpx = Math.random() * width;
    const cpy = prevY + Math.random() * yStep * 0.5;
    const endX = Math.random() * width;
    const endY = prevY + yStep + Math.random() * yStep * 0.5;
    d += ` Q${cpx.toFixed(0)},${cpy.toFixed(0)} ${endX.toFixed(0)},${endY.toFixed(0)}`;
    prevY = endY;
  }
  return d;
}

interface ActiveScribble {
  id: number;
  x: number;      // % from left
  y: number;      // px from top of document
  width: number;
  height: number;
  path: string;
  duration: number;
  strokeWidth: number;
  opacity: number;
}

export default function Scribbles({ maxActive = 5, spawnInterval = 2500 }: { maxActive?: number; spawnInterval?: number }) {
  const [scribbles, setScribbles] = useState<ActiveScribble[]>([]);
  const idRef = useRef(0);

  const spawnScribble = useCallback(() => {
    // Get total page height and current scroll
    const pageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Spawn within a range around the current viewport (above + below)
    const spawnTop = Math.max(0, scrollY - viewportHeight * 0.5);
    const spawnBottom = Math.min(pageHeight, scrollY + viewportHeight * 1.5);
    const y = spawnTop + Math.random() * (spawnBottom - spawnTop);

    const x = Math.random() * 85 + 2; // 2% - 87% from left
    const width = Math.floor(Math.random() * 300 + 250); // 250 - 550
    const height = Math.floor(Math.random() * 400 + 300); // 300 - 700
    const duration = Math.random() * 4 + 4; // 4-8s (longer for bigger lines)
    const strokeWidth = Math.random() * 1.5 + 1.2; // 1.2-2.7
    const opacity = Math.random() * 0.35 + 0.15; // 0.15-0.5

    const currentId = idRef.current++;

    const newScribble: ActiveScribble = {
      id: currentId,
      x,
      y,
      width,
      height,
      path: randomPath(width, height),
      duration,
      strokeWidth,
      opacity,
    };

    setScribbles(prev => {
      const next = [...prev, newScribble];
      // Keep only maxActive scribbles
      if (next.length > maxActive) {
        return next.slice(next.length - maxActive);
      }
      return next;
    });
  }, [maxActive]);

  // Spawn on interval
  useEffect(() => {
    // Spawn initial batch quickly
    const initialTimer = setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => spawnScribble(), i * 400);
      }
    }, 300);

    const interval = setInterval(spawnScribble, spawnInterval);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [spawnScribble, spawnInterval]);

  // Also spawn on scroll
  useEffect(() => {
    let lastScroll = 0;
    let scrollAccum = 0;

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScroll);
      scrollAccum += delta;
      lastScroll = window.scrollY;

      // Spawn a scribble every ~400px of scrolling
      if (scrollAccum > 400) {
        scrollAccum = 0;
        spawnScribble();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [spawnScribble]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {scribbles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            top: s.y,
            left: `${s.x}%`,
            opacity: s.opacity,
            animation: `scribbleFade ${s.duration}s ease-in-out forwards`,
          }}
        >
          <svg
            width={s.width}
            height={s.height}
            viewBox={`0 0 ${s.width} ${s.height}`}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ overflow: 'visible' }}
          >
            <path
              d={s.path}
              pathLength={1}
              fill="none"
              stroke="var(--color-blob-stroke)"
              strokeWidth={s.strokeWidth}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: `drawLoop ${s.duration}s linear infinite`,
              }}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
