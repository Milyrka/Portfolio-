"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothExperience({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const context = gsap.context(() => {
      // Film technique: curtain reveal — the page opens as one composed frame.
      gsap.from(".hero-copy > *", { y: 50, opacity: 0, duration: 1.15, stagger: 0.12, ease: "power3.out" });
      gsap.from(".hero-orbit", { scale: 0.82, rotate: -5, opacity: 0, duration: 1.8, ease: "expo.out" });

      // Film technique: crane drift — shallow layered movement keeps the ivory relief alive.
      gsap.to(".hero-orbit", { yPercent: 16, rotate: 6, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.7 } });
      gsap.to(".hero-copy", { yPercent: 12, opacity: 0.28, ease: "none", scrollTrigger: { trigger: ".hero", start: "42% top", end: "bottom top", scrub: 0.6 } });

      document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
        // Film technique: rack focus — content resolves gently into the foreground.
        gsap.fromTo(element, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });

      document.querySelectorAll<HTMLElement>(".project-visual").forEach((element) => {
        // Film technique: slow dolly — each case gains depth while entering the frame.
        gsap.fromTo(element, { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      });

      gsap.to(".process-orb span", { yPercent: 120, rotate: 110, ease: "none", scrollTrigger: { trigger: ".process", start: "top 70%", end: "bottom 65%", scrub: 0.7 } });
    });

    return () => context.revert();
  }, []);

  return <>{children}</>;
}
