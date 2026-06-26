import { useEffect, useLayoutEffect } from "react";

const REVEAL_SEL  = ".reveal:not(.in), .reveal-left:not(.in), .reveal-right:not(.in), .reveal-scale:not(.in)";
const STAGGER_SEL = ".stagger:not(.in)";
const CHILD_SEL   = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

const activate = (el: Element) => el.classList.add("in");

const inViewport = (el: Element) => {
  const r  = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth  || document.documentElement.clientWidth;
  return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;
};

/**
 * Scroll-reveal hook.
 *
 * Rules:
 * - Children inside a .stagger container are activated as a batch (the
 *   container is observed, not each child) so CSS nth-child delay cascades them.
 * - Everything else is observed individually.
 * - useLayoutEffect fires before first paint → above-fold content is never invisible.
 */
const useReveal = () => {
  // ── Synchronous pre-paint pass ─────────────────────────────
  useLayoutEffect(() => {
    // Individual reveals (not inside stagger)
    document.querySelectorAll<HTMLElement>(REVEAL_SEL).forEach((el) => {
      if (!el.closest(".stagger") && inViewport(el)) activate(el);
    });
    // Stagger containers already in viewport → activate all children instantly
    document.querySelectorAll<HTMLElement>(STAGGER_SEL).forEach((el) => {
      if (inViewport(el)) {
        activate(el);
        el.querySelectorAll<HTMLElement>(CHILD_SEL).forEach(activate);
      }
    });
  }, []);

  // ── Scroll observer ────────────────────────────────────────
  useEffect(() => {
    const targets: HTMLElement[] = [];

    // Individual reveal elements  -  skip those inside a stagger container
    document.querySelectorAll<HTMLElement>(REVEAL_SEL).forEach((el) => {
      if (!el.closest(".stagger")) targets.push(el);
    });
    // Stagger containers themselves
    document.querySelectorAll<HTMLElement>(STAGGER_SEL).forEach((el) => targets.push(el));

    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          activate(el);
          // Stagger container: cascade .in to all children simultaneously;
          // CSS nth-child delay handles the visual cascade.
          if (el.classList.contains("stagger")) {
            el.querySelectorAll<HTMLElement>(CHILD_SEL).forEach(activate);
          }
          obs.unobserve(el);
        }),
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

export default useReveal;
