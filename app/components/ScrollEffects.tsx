"use client";

import { useEffect } from "react";

/**
 * ScrollEffects — lightweight client component that handles:
 * 1. Scroll progress bar
 * 2. Scroll-based Intersection Observer for fade-in animations
 *
 * No external libraries needed.
 */
export default function ScrollEffects() {
  useEffect(() => {
    // ── Scroll Progress Bar ──────────────────────────────────────
    const bar = document.getElementById("scroll-progress");

    const updateProgress = () => {
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });

    // ── Intersection Observer for fade-in ────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", updateProgress);
      observer.disconnect();
    };
  }, []);

  return null;
}
