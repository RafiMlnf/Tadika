'use client';

import { useState, useEffect } from 'react';

interface TripSlideshowProps {
  category: string;
  fallbackImg: string;
  mediaList: any[];
}

export default function TripSlideshow({ category, fallbackImg, mediaList }: TripSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter images for this category (both portrait & landscape, object-fit handles crop)
  const slides = mediaList.filter(m => 
    m.type === 'image' && 
    m.category === category
  ).map(m => m.url);

  useEffect(() => {
    // If we have less than 2 slides, no need to cycle
    if (slides.length < 2) return;

    // Cycle every 4 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: 'var(--color-surface)' }}>
      {/* 
        If there are NO landscape images for this category, show the fallback image. 
        Note: The fallback image is the original static img.
      */}
      {slides.length === 0 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={fallbackImg} 
          alt={category} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
          loading="lazy" 
        />
      )}

      {/* Renders the actual slideshow */}
      {slides.map((url, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={url}
          src={url}
          alt={`${category} slide ${index + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
          loading="lazy"
        />
      ))}
    </div>
  );
}
