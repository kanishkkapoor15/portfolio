"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True only while the element is on screen *and* the tab is foregrounded.
 *
 * Both canvases feed this into R3F's `frameloop`, so an off-screen or
 * backgrounded scene stops producing frames entirely rather than idling at
 * 60fps. With two WebGL contexts on one page that is the difference between a
 * warm laptop and a flat battery.
 */
export function useRenderActive<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden);
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return { ref, active: onScreen && tabVisible };
}
