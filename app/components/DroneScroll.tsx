"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * DroneScroll — Zig-Zag edition
 *
 * Layout contract (enforced via CSS in globals.css):
 *   About   → section-drone-left  (content pushed RIGHT, drone flies LEFT  side)
 *   Projects→ section-drone-right (content pushed LEFT,  drone flies RIGHT side)
 *   Skills  → section-drone-left  (content pushed RIGHT, drone flies LEFT  side)
 *   Contact → section-drone-right (content pushed LEFT,  drone flies RIGHT side)
 *   Footer  → drone descends and "lands" next to the car
 *
 * Drone path (x = % of viewport width, y = % of viewport height):
 *   After hero  → right side  (x≈78%)
 *   About       → cross LEFT  (x≈18%)
 *   Projects    → cross RIGHT (x≈78%)
 *   Skills      → cross LEFT  (x≈18%)
 *   Contact     → cross RIGHT (x≈78%)
 *   Footer      → descend to centre-bottom, land
 *
 * Size: clamp(220px, 26vw, 360px) — noticeably bigger.
 * Hidden below 900px wide.
 */

interface Waypoint {
  t: number;       // scroll progress 0–1
  x: number;       // vw
  y: number;       // vh
  rotate: number;  // deg
  scale: number;
  opacity: number;
}

const WAYPOINTS: Waypoint[] = [
  // Invisible until past hero
  { t: 0.00, x: 78, y: 40, rotate:  0,  scale: 1.0,  opacity: 0 },
  { t: 0.10, x: 78, y: 38, rotate:  0,  scale: 1.0,  opacity: 0 },

  // Fade in, start on RIGHT
  { t: 0.14, x: 78, y: 36, rotate:  3,  scale: 1.0,  opacity: 1 },

  // Cross to LEFT for About section
  { t: 0.22, x: 50, y: 42, rotate: -8,  scale: 0.95, opacity: 1 },
  { t: 0.28, x: 18, y: 48, rotate: -5,  scale: 0.92, opacity: 1 },
  { t: 0.34, x: 16, y: 55, rotate:  2,  scale: 0.90, opacity: 1 },

  // Cross to RIGHT for Projects section
  { t: 0.40, x: 50, y: 48, rotate: 10,  scale: 0.93, opacity: 1 },
  { t: 0.46, x: 80, y: 42, rotate:  6,  scale: 0.95, opacity: 1 },
  { t: 0.52, x: 82, y: 50, rotate:  2,  scale: 0.92, opacity: 1 },

  // Cross to LEFT for Skills section
  { t: 0.58, x: 50, y: 45, rotate: -10, scale: 0.93, opacity: 1 },
  { t: 0.64, x: 17, y: 40, rotate: -5,  scale: 0.91, opacity: 1 },
  { t: 0.70, x: 16, y: 52, rotate:  3,  scale: 0.90, opacity: 1 },

  // Cross to RIGHT for Contact section
  { t: 0.76, x: 50, y: 47, rotate: 10,  scale: 0.93, opacity: 1 },
  { t: 0.82, x: 80, y: 44, rotate:  5,  scale: 0.95, opacity: 1 },
  { t: 0.87, x: 78, y: 54, rotate:  2,  scale: 0.93, opacity: 1 },

  // Descend centre — begin landing
  { t: 0.91, x: 60, y: 58, rotate: -3,  scale: 0.90, opacity: 1 },
  { t: 0.94, x: 55, y: 68, rotate:  0,  scale: 0.92, opacity: 1 },

  // Touch-down — hover with slight bounce
  { t: 0.97, x: 52, y: 78, rotate:  0,  scale: 0.95, opacity: 1 },
  { t: 1.00, x: 52, y: 82, rotate:  0,  scale: 1.00, opacity: 0.85 },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function smoothStep(t: number) { return t * t * (3 - 2 * t); }

function interpolate(progress: number): Omit<Waypoint, "t"> {
  const p = Math.max(0, Math.min(1, progress));
  let lo = WAYPOINTS[0];
  let hi = WAYPOINTS[WAYPOINTS.length - 1];
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (p >= WAYPOINTS[i].t && p <= WAYPOINTS[i + 1].t) {
      lo = WAYPOINTS[i];
      hi = WAYPOINTS[i + 1];
      break;
    }
  }
  const span  = hi.t - lo.t;
  const local = span === 0 ? 0 : (p - lo.t) / span;
  const e     = smoothStep(local);
  return {
    x:       lerp(lo.x,       hi.x,       e),
    y:       lerp(lo.y,       hi.y,       e),
    rotate:  lerp(lo.rotate,  hi.rotate,  e),
    scale:   lerp(lo.scale,   hi.scale,   e),
    opacity: lerp(lo.opacity, hi.opacity, e),
  };
}

export default function DroneScroll() {
  const droneRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    if (window.innerWidth < 900) return;

    let initialised = false;

    const update = () => {
      const el = droneRef.current;
      if (!el) return;

      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress  = Math.min(1, scrollTop / maxScroll);

      const { x, y, rotate, scale, opacity } = interpolate(progress);

      el.style.left      = `${x}vw`;
      el.style.top       = `${y}vh`;
      el.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`;
      el.style.opacity   = String(Math.max(0, Math.min(1, opacity)));

      // Trigger landing state near the bottom
      setLanded(progress > 0.94);

      if (!initialised) {
        // First update — transition was "none", now enable it
        requestAnimationFrame(() => {
          if (droneRef.current) {
            droneRef.current.style.transition =
              "left 0.55s cubic-bezier(0.25,0.46,0.45,0.94)," +
              "top 0.55s cubic-bezier(0.25,0.46,0.45,0.94)," +
              "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)," +
              "opacity 0.35s ease";
          }
        });
        initialised = true;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    // Snap to position silently first
    if (droneRef.current) droneRef.current.style.transition = "none";
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={droneRef}
      id="drone-scroll"
      aria-hidden="true"
      className={`drone-scroll-widget ${landed ? "drone-landed" : ""}`}
      style={{
        position:      "fixed",
        pointerEvents: "none",
        zIndex:        20,
        /* Size — noticeably bigger than before */
        width:         "clamp(200px, 24vw, 340px)",
        opacity:       0,
        willChange:    "transform, left, top, opacity",
        top:           "36vh",
        left:          "78vw",
        transform:     "translate(-50%, -50%)",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position:   "absolute",
          inset:      "-25%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(0,212,255,0.14) 0%, transparent 65%)",
          animation:  "pulse-glow 4s ease-in-out infinite",
        }}
      />
      {/* Flight path trail — subtle line behind the drone */}
      <div className="drone-trail" aria-hidden="true" />

      <Image
        src="/drone-blueprint.png"
        alt=""
        width={560}
        height={560}
        style={{
          width:  "100%",
          height: "auto",
          filter: "drop-shadow(0 0 20px rgba(0,212,255,0.5))",
          display: "block",
        }}
        sizes="28vw"
        priority={false}
      />
    </div>
  );
}
