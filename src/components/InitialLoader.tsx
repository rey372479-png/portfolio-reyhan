"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobileViewport);

    const delay = mediaQuery.matches ? 0 : mobileViewport ? 320 : 480;
    const exitTimer = window.setTimeout(() => setIsExiting(true), delay);
    const removeTimer = window.setTimeout(
      () => setIsVisible(false),
      delay + (mediaQuery.matches ? 0 : 240),
    );

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`loading-screen${isExiting ? " is-exiting" : ""}`}
      aria-live="polite"
      aria-busy={!isExiting}
    >
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
