'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/trips', label: 'TRIPS' },
    { href: '/archive', label: 'ARCHIVE' },
    { href: '/upload', label: 'UPLOAD' },
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
                <div className="navbar-inner section-container">
                    {/* Brand */}
                    <Link href="/" className="navbar-brand font-display">
                        Tadika
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="navbar-links">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-pill ${isActive(link.href) ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
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
                    /SIRKEL ARCHIVE
                </div>
            </div>
        </>
    );
}
