"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProfilePortrait() {
  const [isPhotoSwapped, setIsPhotoSwapped] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPhotoSwapped) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldReduceMotion = mediaQuery.matches;
    const delay = shouldReduceMotion ? 0 : 2000;

    timeoutRef.current = window.setTimeout(() => {
      setIsPhotoSwapped(false);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isPhotoSwapped]);

  const handleToggle = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setIsPhotoSwapped((swapped) => !swapped);
  };

  return (
    <div className="hero-visual home-portrait">
      <div className="hero-glow" aria-hidden="true" />
      <button
        type="button"
        className={`hero-image-frame home-portrait-frame${isPhotoSwapped ? " is-photo-swapped" : ""}`}
        aria-label="Ganti foto profil"
        aria-pressed={isPhotoSwapped}
        onClick={handleToggle}
      >
        <span className="hero-image-number">01</span>
        <Image
          src="/profile.jpg"
          alt="M. Reyhan Purnomo Putra berdiri di depan mobil-mobil di malam hari"
          className="hero-profile-image"
          fill
          sizes="(max-width: 991px) 82vw, 390px"
          preload
        />
        <Image
          src="/profile-hover.jpg"
          alt=""
          aria-hidden="true"
          className="hero-profile-image hero-profile-image-hover"
          fill
          sizes="(max-width: 991px) 82vw, 390px"
        />
        <span className="hero-image-label">
          <span>BASED IN</span>
          <strong>PASURUAN, INDONESIA</strong>
        </span>
      </button>
      <span className="portrait-caption">A student, builder, and explorer.</span>
    </div>
  );
}