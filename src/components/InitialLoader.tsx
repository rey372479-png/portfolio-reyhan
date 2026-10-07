"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);

    updateViewport();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mediaQuery.matches;

    const timer = window.setTimeout(
      () => setIsVisible(false),
      reducedMotion ? 180 : 700,
    );

    window.addEventListener("resize", updateViewport);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="loading-screen" aria-live="polite" aria-busy="true">
      <div className="loading-screen-inner">
        <div className="loading-desktop" aria-hidden="true">
          <span className="loading-mark">MR.</span>
          <div className="loading-stack">
            <span>BUILD.</span>
            <span>LEAD.</span>
            <span>EXPLORE.</span>
          </div>
        </div>

        <div className="loading-mobile" aria-hidden="true">
          <span className="loading-mark">MR</span>
          <p>
            <strong>{isMobile ? "BUILD" : "BUILD."}</strong>
            <span> · </span>
            <strong>{isMobile ? "LEAD" : "LEAD."}</strong>
            <span> · </span>
            <strong>{isMobile ? "EXPLORE" : "EXPLORE."}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
