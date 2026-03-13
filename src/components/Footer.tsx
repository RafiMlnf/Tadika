'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="section-container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col footer-brand-col">
                        <Link href="/" className="footer-brand font-display">Tadika</Link>
                        <p className="footer-tagline font-body">
                            Arsip kenangan sirkel dari 2022 hingga sekarang. Foto, video, trip, dan semua momen berharga bersama.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Instagram" className="footer-social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="5" />
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Twitter" className="footer-social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div className="footer-col">
                        <h4 className="footer-heading font-mono">NAVIGASI</h4>
                        <ul className="footer-links">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/gallery">Gallery</Link></li>
                            <li><Link href="/trips">Trips</Link></li>
                            <li><Link href="/archive">Archive</Link></li>
                            <li><Link href="/upload">Upload</Link></li>
                        </ul>
                    </div>

                    {/* Collection Column */}
                    <div className="footer-col">
                        <h4 className="footer-heading font-mono">KOLEKSI</h4>
                        <ul className="footer-links">
                            <li><Link href="/gallery/pantai">Pantai</Link></li>
                            <li><Link href="/gallery/gunung">Gunung</Link></li>
                            <li><Link href="/gallery/kota">Kota</Link></li>
                            <li><Link href="/gallery/campus">Kampus</Link></li>
                        </ul>
                    </div>

                    {/* Info Column */}
                    <div className="footer-col">
                        <h4 className="footer-heading font-mono">INFO</h4>
                        <ul className="footer-links">
                            <li><Link href="/archive">Arsip Lengkap</Link></li>
                            <li><Link href="/upload">Kontribusi Foto</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-divider" />
                    <div className="footer-bottom-content">
                        <span className="font-mono footer-copy">
                            © 2022 — 2026 Tadika / Sirkel Archive
                        </span>
                        <span className="font-mono footer-made">
                            crafted with ♥
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
