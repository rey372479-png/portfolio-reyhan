"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isPhotoSwapped, setIsPhotoSwapped] = useState(false);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-grid-bg"></div>

        <div className="container position-relative">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-7">
              <div className="hero-content">
                <div className="hero-badge">
                  <span className="hero-dot"></span>
                  STUDENT • WEB DEVELOPER
                </div>

                <p className="hero-kicker">HELLO, I'M</p>

                <h1 className="hero-title">
                  M. Reyhan
                  <br />
                  <span>Purnomo Putra.</span>
                </h1>

                <p className="hero-role">
                  Web Developer <span>/</span> Forex &amp; Crypto
                  Enthusiast
                </p>

                <p className="hero-description">
                  Saya adalah siswa SMKN 1 Kota Pasuruan yang sedang
                  mengembangkan kemampuan di bidang web development,
                  trading forex, dan investasi cryptocurrency,
                  khususnya Bitcoin.
                </p>

                <div className="hero-actions">
                  <Link
                    href="/proyek"
                    className="hero-btn hero-btn-primary"
                  >
                    View My Projects <span>↗</span>
                  </Link>

                  <Link
                    href="/kontak"
                    className="hero-btn hero-btn-secondary"
                  >
                    Contact Me
                  </Link>
                </div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <strong>17</strong>
                    <span>YEARS OLD</span>
                  </div>

                  <div className="hero-stat-line"></div>

                  <div className="hero-stat">
                    <strong>06</strong>
                    <span>PROJECTS</span>
                  </div>

                  <div className="hero-stat-line"></div>

                  <div className="hero-stat">
                    <strong>03</strong>
                    <span>MAIN FOCUS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-visual">
                <div className="hero-orbit hero-orbit-one"></div>
                <div className="hero-orbit hero-orbit-two"></div>

                <div className="hero-glow"></div>

                <div
                  className={`hero-image-frame${isPhotoSwapped ? " is-photo-swapped" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-label="Ganti foto profil"
                  aria-pressed={isPhotoSwapped}
                  onClick={() => setIsPhotoSwapped((swapped) => !swapped)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setIsPhotoSwapped((swapped) => !swapped);
                    }
                  }}
                >
                  <div className="hero-image-number">01</div>

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

                  <div className="hero-image-label">
                    <span>BASED IN</span>
                    <strong>PASURUAN, INDONESIA</strong>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="intro-section">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-8">
              <p className="section-label">01 / ABOUT</p>

              <h2 className="intro-title">
                Learning.
                <br />
                Building.
                <br />
                <span>Growing.</span>
              </h2>
            </div>

            <div className="col-lg-4">
              <p className="intro-text">
                Saya percaya bahwa kemampuan dibangun melalui proses.
                Setiap project yang saya kerjakan menjadi bagian dari
                perjalanan saya untuk terus belajar dan berkembang.
              </p>

              <Link href="/tentang" className="minimal-link">
                More About Me <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="overview-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="overview-card">
                <span>01</span>
                <h3>Web Development</h3>
                <p>
                  Membangun website menggunakan HTML, CSS, dan
                  Next.js.
                </p>
                <Link href="/keahlian">Explore Skills →</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="overview-card">
                <span>02</span>
                <h3>Forex Trading</h3>
                <p>
                  Mempelajari market, analisis, strategi, dan
                  manajemen risiko.
                </p>
                <Link href="/keahlian">My Focus →</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="overview-card">
                <span>03</span>
                <h3>Crypto &amp; Bitcoin</h3>
                <p>
                  Mempelajari aset crypto dengan fokus utama pada
                  Bitcoin.
                </p>
                <Link href="/keahlian">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}