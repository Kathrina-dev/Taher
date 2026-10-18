"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when nav link clicked
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        className="progress-bar"
        aria-hidden="true"
      />

      <header
        id="navbar"
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        role="banner"
      >
        <div className="container">
          {/* Logo / Wordmark */}
          <div className="nav-logo" aria-label="Taher Haidri">
            T.HAIDRI
            <span>// ME.ENG</span>
          </div>

          {/* Desktop navigation */}
          <nav role="navigation" aria-label="Main navigation">
            <ul className="nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} id={`nav-${link.label.toLowerCase()}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="nav-menu-toggle"
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <nav
        id="nav-drawer"
        className={`nav-drawer ${menuOpen ? "open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            id={`nav-mobile-${link.label.toLowerCase()}`}
            onClick={handleLinkClick}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
