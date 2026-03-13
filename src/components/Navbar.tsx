'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Galeri' },
    { href: '/trips', label: 'Perjalanan' },
    { href: '/archive', label: 'Arsip' },
    { href: '/upload', label: 'Upload' },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar-inner section-container" style={{ justifyContent: 'space-between' }}>
                    {/* Desktop Nav Links & Back to top */}
                    <nav className={`navbar-links ${scrolled ? 'nav-collapsed' : ''}`}>
                        <div className="nav-pills-container">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`nav-pill ${isActive(link.href) ? 'active' : ''}`}
                                    style={{ textTransform: 'capitalize' }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <button
                            className="back-to-top-btn"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aria-label="Back to top"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                        </button>
                    </nav>

                    {/* Right side: Theme toggle + Mobile hamburger */}
                    <div className="navbar-actions">
                        <button
                            onClick={toggleTheme}
                            className="nav-pill theme-toggle"
                            aria-label="Toggle dark mode"
                        >
                            <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
                        </button>

                        <button
                            className="hamburger"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
                            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
                            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileOpen ? 'mobile-menu-open' : ''}`}>
                <nav className="mobile-menu-nav">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`mobile-menu-link ${isActive(link.href) ? 'active' : ''}`}
                            style={{ animationDelay: `${i * 0.08}s` }}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="mobile-menu-footer font-mono">
                    /TADIKA ARCHIVE
                </div>
            </div>
        </>
    );
}
