import FeedbackForm from "@/components/FeedbackForm";

export default function KontakPage() {
  return (
    <main className="page contact-page">
      <div className="container">
        <p className="section-label">05 / CONTACT</p>

        <div className="contact-hero">
          <div className="contact-copy">
            <h1 className="editorial-page-title">
              Let&apos;s build
              <span> something meaningful.</span>
            </h1>
            <p className="inner-intro">
              Saya terbuka untuk diskusi soal project, pengembangan web, design,
              atau ide baru yang menggabungkan proses belajar dengan tujuan yang
              jelas.
            </p>
          </div>

          <div className="info-rail panel-surface">
            <p className="meta-kicker">START A CONVERSATION</p>
            <p>Always open to thoughtful collaboration, feedback, and new work.</p>
          </div>
        </div>

        <div className="contact-box panel-surface">
          <p className="section-label">GET IN TOUCH</p>

          <h2>
            Good things
            <br />
            start with a conversation.
          </h2>

          <p>
            Jika Anda sedang mencari seseorang yang menyukai proses kerja yang
            rapi, belajar dengan cepat, dan tetap ingin berkembang, saya siap
            untuk terhubung.
          </p>

          <div className="contact-links">
            <a
              href="https://instagram.com/ryhnptraaaa_"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <span className="social-label">INSTAGRAM</span>
              <strong>@ryhnptraaaa_ ↗</strong>
            </a>

            <a
              href="https://www.tiktok.com/@talk.to.who0?_r=1&_t=ZS-99ZrADQYCON"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <span className="social-label">TIKTOK</span>
              <strong>@talk.to.who0 ↗</strong>
            </a>

            <a
              href="https://discord.gg/JrqKJetr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <span className="social-label">DISCORD</span>
              <strong>Join My Server ↗</strong>
            </a>
          </div>
        </div>

        <div className="feedback-panel panel-surface">
          <p className="section-label">CRITICISM &amp; SUGGESTIONS</p>
          <h2>Have an idea or something I could improve?</h2>
          <FeedbackForm />
        </div>
      </div>
    </main>
  );
}