import Link from "next/link";
import CardProyek from "@/components/CardProyek";
import ProfilePortrait from "@/components/ProfilePortrait";
import { getProyek } from "@/lib/proyek";

const specialties = [
  {
    number: "01",
    title: "Build",
    description:
      "Membuat antarmuka web dan terus belajar lewat Next.js, TypeScript, HTML, dan CSS.",
    detail: "WEB DEVELOPMENT",
  },
  {
    number: "02",
    title: "Lead",
    description:
      "Bertumbuh melalui pengalaman organisasi dan tanggung jawab bersama di IPM.",
    detail: "ORGANISATION",
  },
  {
    number: "03",
    title: "Explore",
    description:
      "Mengikuti rasa ingin tahu pada teknologi, pasar finansial, dan cara belajar yang berkelanjutan.",
    detail: "CONTINUOUS LEARNING",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "HTML",
  "CSS",
  "Bootstrap",
  "Supabase",
  "Figma",
];

const journey = [
  {
    label: "STUDY",
    title: "A student in Pasuruan",
    description:
      "Belajar di SMKN 1 Kota Pasuruan sambil membangun fondasi di bidang teknologi.",
  },
  {
    label: "SERVE",
    title: "Growing through leadership",
    description:
      "Menjalankan tanggung jawab sebagai Head of Cadre Development di PR IPM SMP Muhammadiyah 1 Kota Pasuruan.",
  },
  {
    label: "EXPLORE",
    title: "Curiosity beyond code",
    description:
      "Mempelajari forex, cryptocurrency, Bitcoin, dan investasi sebagai bagian dari perjalanan belajar pribadi.",
  },
];

export default async function Home() {
  const projects = await getProyek();

  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-grid" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="row align-items-center gy-5">
            <div className="col-lg-7">
              <div className="home-hero-copy">
                <p className="eyebrow home-hero-eyebrow">
                  <span className="eyebrow-line" /> PORTFOLIO · PASURUAN, INDONESIA
                </p>
                <h1 className="home-hero-title" id="home-title">
                  <span>M. REYHAN</span>
                  <span className="home-hero-title-outline">PURNOMO PUTRA</span>
                </h1>
                <p className="home-hero-manifesto">BUILD. LEAD. EXPLORE.</p>
                <p className="home-hero-role">
                  Web Developer <span>·</span> Student <span>·</span> Explorer
                </p>
                <div className="home-hero-actions">
                  <Link href="#story" className="editorial-button editorial-button-light">
                    Explore my story <span aria-hidden="true">↘</span>
                  </Link>
                  <Link href="/proyek" className="editorial-text-link">
                    View projects <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <p className="home-hero-note">
                  Curious about what can be built, learned, and shared.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <ProfilePortrait />
            </div>
          </div>
          <a className="home-scroll-cue" href="#story">
            <span>SCROLL TO EXPLORE</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="story-section home-section" id="story">
        <div className="container">
          <div className="section-heading-row">
            <p className="eyebrow"><span>01</span> WHO IS REYHAN?</p>
            <p className="section-aside">A little more than a line of code.</p>
          </div>
          <div className="row gy-4 align-items-end">
            <div className="col-lg-7">
              <h2 className="editorial-heading">
                Still learning.
                <br />
                <span>Always becoming.</span>
              </h2>
            </div>
            <div className="col-lg-5">
              <p className="story-copy">
                Saya M. Reyhan Purnomo Putra, seorang siswa dan web developer
                yang senang memahami bagaimana sesuatu bekerja. Saya belajar
                dengan membuat project, mengambil tanggung jawab, dan tetap
                terbuka pada ide di luar layar.
              </p>
              <Link href="/tentang" className="editorial-text-link">
                More about me <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sides-section home-section">
        <div className="container">
          <div className="section-heading-row">
            <p className="eyebrow"><span>02</span> THREE SIDES OF REYHAN</p>
            <p className="section-aside">Different interests, one curious mind.</p>
          </div>
          <div className="row g-3">
            {specialties.map((specialty) => (
              <div className="col-md-4" key={specialty.number}>
                <article className="side-card">
                  <div className="side-card-top">
                    <span>{specialty.number}</span>
                    <span className="side-card-detail">{specialty.detail}</span>
                  </div>
                  <h3>{specialty.title}<span>.</span></h3>
                  <p>{specialty.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="leadership-section home-section">
        <div className="container">
          <div className="leadership-panel">
            <div className="leadership-index">
              <p className="eyebrow"><span>03</span> BEYOND CODE</p>
              <span className="leadership-mark" aria-hidden="true">L</span>
            </div>
            <div className="leadership-copy">
              <h2 className="editorial-heading">Leadership is also a way to build.</h2>
              <p>
                Di IPM, saya belajar bahwa berkembang bukan hanya soal kemampuan
                sendiri. Saya pernah mengemban posisi Head of Cadre Development
                di PR IPM SMP Muhammadiyah 1 Kota Pasuruan, membantu proses
                kaderisasi dan belajar memegang tanggung jawab bersama.
              </p>
              <span className="leadership-caption">LISTEN · ORGANISE · GROW</span>
            </div>
          </div>
        </div>
      </section>

      <section className="markets-section home-section">
        <div className="container">
          <div className="section-heading-row">
            <p className="eyebrow"><span>04</span> FINANCIAL MARKETS</p>
            <p className="section-aside">An ongoing personal learning journey.</p>
          </div>
          <div className="row gy-4 align-items-start">
            <div className="col-lg-5">
              <h2 className="editorial-heading">Curiosity with a wider lens.</h2>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <p className="story-copy">
                Di luar web development, saya tertarik mempelajari forex,
                cryptocurrency, Bitcoin, dan investasi. Saya melihatnya sebagai
                ruang untuk terus belajar tentang teknologi, risiko, dan cara
                mengambil keputusan. Ini adalah minat pribadi, bukan nasihat
                finansial.
              </p>
              <div className="market-topics" aria-label="Topik yang dipelajari">
                <span>Forex</span><span>Cryptocurrency</span><span>Bitcoin</span><span>Investing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="technology-section home-section">
        <div className="container">
          <div className="section-heading-row">
            <p className="eyebrow"><span>05</span> TECHNOLOGY</p>
            <p className="section-aside">Tools I have worked with or am learning.</p>
          </div>
          <div className="technology-list">
            {technologies.map((technology, index) => (
              <span className="technology-item" key={technology}>
                <small>{String(index + 1).padStart(2, "0")}</small>{technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="selected-work-section home-section" id="selected-work">
        <div className="container">
          <div className="section-heading-row selected-work-heading">
            <div>
              <p className="eyebrow"><span>06</span> SELECTED WORK</p>
              <h2 className="editorial-heading">Made while learning.</h2>
            </div>
            <Link href="/proyek" className="editorial-text-link">
              All projects <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="projects-grid home-projects-grid">
            {projects.map((proyek) => <CardProyek key={proyek.id} proyek={proyek} />)}
          </div>
        </div>
      </section>

      <section className="journey-section home-section">
        <div className="container">
          <div className="section-heading-row">
            <p className="eyebrow"><span>07</span> MY JOURNEY</p>
            <p className="section-aside">No finish line, just the next thing to learn.</p>
          </div>
          <div className="journey-list">
            {journey.map((step) => (
              <article className="journey-item" key={step.label}>
                <span className="journey-label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mindset-section home-section">
        <div className="container">
          <p className="eyebrow"><span>08</span> THE MINDSET</p>
          <p className="mindset-line">
            BUILD. <span>LEARN.</span> LEAD.
            <br />
            <span>EXPLORE.</span> REPEAT.
          </p>
        </div>
      </section>

      <section className="home-contact-section">
        <div className="container home-contact-inner">
          <div>
            <p className="eyebrow"><span>09</span> KEEP IN TOUCH</p>
            <h2>Good things start with a conversation.</h2>
          </div>
          <div className="home-contact-actions">
            <Link href="/proyek" className="editorial-button editorial-button-light">
              Explore projects <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/kontak" className="editorial-text-link">
              Contact Reyhan <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}