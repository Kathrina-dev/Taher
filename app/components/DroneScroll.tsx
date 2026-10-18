"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* ─── helpers ─────────────────────────────────────────────── */

function ease(t: number): number {
  const p = Math.max(0, Math.min(1, t));
  return p * p * (3 - 2 * p);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ─── component ───────────────────────────────────────────── */

/**
 * DroneScroll — smooth hero-to-experience flight widget
 *
 * Design decisions that prevent every past glitch:
 *  • Owns its own <Image> — NEVER touches or moves the hero img.
 *  • Always position:fixed left:0 top:0.
 *    Position expressed entirely through transform so only the
 *    compositor layer is dirtied (no layout, no paint).
 *  • Two CSS transition profiles:
 *      – flight  → 0.65 s ease (smooth horizontal travel)
 *      – tracking→ 0.12 s ease (responsive while attached to experience)
 *    Switching between profiles never causes a jump because we
 *    don't change position at the same frame we change the profile.
 *  • Scroll-up just reverses every calculation — no special case needed.
 */
export default function DroneScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const el = element;

    /* reduced-motion / narrow-viewport guard */
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 900
    ) {
      el.style.display = "none";
      return;
    }

    let isTracking = false;

    /* ── transition helpers ─────────────────────────── */
    const FLIGHT_TRANSITION =
      "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)," +
      "opacity  0.45s ease";
    const TRACK_TRANSITION =
      "transform 0.12s ease," +
      "opacity  0.35s ease";

    function setTransition(track: boolean) {
      if (track === isTracking) return;
      isTracking = track;
      el.style.transition = track ? TRACK_TRANSITION : FLIGHT_TRANSITION;
    }

    /* ── core update ────────────────────────────────── */
    const update = () => {
      const scrollY = window.scrollY;
      const vh      = window.innerHeight;
      const vw      = window.innerWidth;

      const homeEl      = document.getElementById("home");
      const spaceEl     = document.querySelector<HTMLElement>(".timeline-drone-space");

      /* hero-bottom in document coords */
      const homeBottom = homeEl
        ? homeEl.getBoundingClientRect().bottom + scrollY
        : vh;

      /* The widget begins on the left of the hero and flies toward the
         experience column. Once it arrives, the column owns its vertical
         movement, so the drone scrolls away with that section. */
      const homeStart = Math.max(0, homeBottom - vh);
      let x       = 28;   /* vw */
      let y       = 50;   /* vh */
      let rotate  = -6;
      let scale   = 1.2;
      const opacity = 1;

      if (spaceEl) {
        const rect         = spaceEl.getBoundingClientRect();
        const experienceTop = rect.top + scrollY;
        const experienceCenter = experienceTop + rect.height * 0.5;
        const landingScroll = Math.max(homeStart, experienceCenter - vh * 0.5);
        const flightDuration = Math.max(vh * 0.8, landingScroll - homeStart);
        const flightProgress = ease(
          Math.max(0, Math.min(1, (scrollY - homeStart) / flightDuration))
        );
        const cx = Math.max(10, Math.min(90, (rect.left + rect.width * 0.5) / vw * 100));

        if (scrollY < landingScroll) {
          setTransition(false);
          x = lerp(28, cx, flightProgress);
          y = lerp(50, 50, flightProgress);
          scale = lerp(1.2, 0.9, flightProgress);
          rotate = lerp(-6, 2, flightProgress);
        } else {
          /* The horizontal position is parked; the section's document
             position drives y, making the drone scroll with experience. */
          setTransition(true);
          x = cx;
          y = (rect.top + rect.height * 0.5) / vh * 100;
          scale = 0.9;
          rotate = 2;
        }
      } else {
        /* no experience lane: keep the drone parked on the left */
        setTransition(false);
      }

      /* GPU-only update: only transform + opacity */
      el.style.transform =
        `translateX(${x}vw) translateY(${y}vh)` +
        ` translate(-50%, -50%)` +
        ` rotate(${rotate}deg) scale(${scale})`;
      el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
    };

    /* ── listeners ──────────────────────────────────── */
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };

    /* snap to initial position silently, then activate transitions */
    el.style.transition = "none";
    update();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transition = FLIGHT_TRANSITION;
        }
      });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize",  update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize",  update);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      id="drone-scroll"
      aria-hidden="true"
      className="drone-scroll-widget"
      style={{
        /* always anchored to top-left; transform does ALL the positioning */
        position:      "fixed",
        left:          0,
        top:           0,
        pointerEvents: "none",
        zIndex:        20,
        width:         "clamp(280px, 42vw, 620px)",
        opacity:       0,
        willChange:    "transform, opacity",
        /* initial transform matches the JS default (left side, -62 vh) */
        transform:
          "translateX(24vw) translateY(-62vh) translate(-50%, -50%) scale(0.88)",
      }}
    >
      {/* ambient glow ring */}
      <div className="drone-glow" aria-hidden="true" />

      {/* ── Drone image ── own copy, independent of hero ── */}
      <Image
        src="/drone-blueprint.png"
        alt=""
        width={300}
        height={300}
        className="drone-image"
        style={{
          width:   "100%",
          height:  "auto",
          display: "block",
        }}
        sizes="(max-width:1200px) 30vw, 420px"
      />
    </div>
  );
}