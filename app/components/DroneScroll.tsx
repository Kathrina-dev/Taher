
"use client";

import { useEffect, useRef } from "react";

function smoothStep(t: number) {
  const p = Math.max(0, Math.min(1, t));
  return p * p * (3 - 2 * p);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function DroneScroll() {
  const droneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const wrapper = droneRef.current;
    const anchor = document.getElementById("hero-drone-anchor");
    const about = document.getElementById("about");

    const drone =
      anchor?.querySelector<HTMLImageElement>("img");

    if (!wrapper || !anchor || !drone || !about) {
      console.warn(
        "DroneScroll: Could not find the hero drone or #about section."
      );
      return;
    }

    const mq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    // Keep the original image in the hero on mobile
    // and when reduced motion is enabled.
    if (mq.matches || window.innerWidth < 900) {
      wrapper.style.display = "none";
      return;
    }

    // Preserve the original image's location and styling.
    const originalParent = drone.parentNode;
    const originalNextSibling = drone.nextSibling;
    const originalStyle = drone.getAttribute("style");

    // Move the EXISTING image. Do not create another one.
    wrapper.appendChild(drone);

    Object.assign(drone.style, {
      width: "100%",
      height: "auto",
      display: "block",
      filter: "drop-shadow(0 0 20px rgba(0,212,255,0.5))",
    });

    wrapper.style.transition = "none";
    wrapper.style.opacity = "1";
    wrapper.style.left = "78vw";
    wrapper.style.top = "36vh";
    wrapper.style.transform =
      "translate(-50%, -50%) rotate(0deg) scale(1)";

    let frameRequested = false;

    const update = () => {
      frameRequested = false;

      if (!droneRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Start the flight shortly before About enters view.
      const aboutTop = about.getBoundingClientRect().top + scrollY;
      const aboutHeight = about.offsetHeight;

      const flightStart = Math.max(
        0,
        aboutTop - viewportHeight * 0.65
      );

      // Reach the left side early in the About section.
      const flightEnd =
        aboutTop + Math.min(
          viewportHeight * 0.35,
          aboutHeight * 0.35
        );

      // Keep the drone on the left until About is nearly over.
      const hideStart =
        aboutTop + aboutHeight * 0.82;

      const hideEnd =
        aboutTop + aboutHeight;

      const flightProgress =
        flightEnd <= flightStart
          ? 1
          : smoothStep(
              (scrollY - flightStart) /
              (flightEnd - flightStart)
            );

      // Hero: right. About: left.
      const x = lerp(78, 18, flightProgress);
      const y = lerp(36, 48, flightProgress);
      const rotate = lerp(0, -5, flightProgress);
      const scale = lerp(1, 0.92, flightProgress);

      // Hide only after the About section finishes.
      const fadeProgress = smoothStep(
        (scrollY - hideStart) /
        Math.max(1, hideEnd - hideStart)
      );

      const opacity = 1 - fadeProgress;

      wrapper.style.left = `${x}vw`;
      wrapper.style.top = `${y}vh`;
      wrapper.style.transform =
        `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`;
      wrapper.style.opacity = String(opacity);
      wrapper.style.visibility =
        opacity <= 0.01 ? "hidden" : "visible";

      wrapper.classList.toggle(
        "drone-landed",
        flightProgress >= 1
      );
    };

    const onScroll = () => {
      if (frameRequested) return;

      frameRequested = true;
      rafRef.current = requestAnimationFrame(update);
    };

    // Position it immediately, so it doesn't fly in from nowhere.
    update();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafRef.current);

      // Restore the same image to its original hero location.
      if (originalParent?.isConnected) {
        if (
          originalNextSibling &&
          originalNextSibling.parentNode === originalParent
        ) {
          originalParent.insertBefore(
            drone,
            originalNextSibling
          );
        } else {
          originalParent.appendChild(drone);
        }
      }

      if (originalStyle === null) {
        drone.removeAttribute("style");
      } else {
        drone.setAttribute("style", originalStyle);
      }
    };
  }, []);

  return (
    <div
      ref={droneRef}
      id="drone-scroll"
      aria-hidden="true"
      className="drone-scroll-widget"
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 20,
        width: "clamp(200px, 24vw, 340px)",
        opacity: 1,
        visibility: "visible",
        willChange: "transform, left, top, opacity",
        top: "36vh",
        left: "78vw",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-25%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(0,212,255,0.14) 0%, transparent 65%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      <div className="drone-trail" aria-hidden="true" />
    </div>
  );
}
