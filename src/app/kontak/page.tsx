export default function KontakPage() {
  return (
    <main className="page">
      <div className="container">
        <p className="section-label">05 / CONTACT</p>

        <h1 className="section-title">
          Let's
          <br />
          Connect.
        </h1>

        <div className="contact-box">
          <p className="section-label">GET IN TOUCH</p>

          <h2>
            Have something
            <br />
            to talk about?
          </h2>

          <p>
            Saya terbuka untuk terhubung, berdiskusi mengenai
            project, web development, atau sekadar berkenalan.
          </p>

          <div className="contact-links">
            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/ryhnptraaaa_"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <span className="social-label">INSTAGRAM</span>
              <strong>@ryhnptraaaa_ ↗</strong>
            </a>

            {/* TIKTOK */}
            <a
              href="https://www.tiktok.com/@talk.to.who0?_r=1&_t=ZS-99ZrADQYCON"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <span className="social-label">TIKTOK</span>
              <strong>@talk.to.who0 ↗</strong>
            </a>

            {/* DISCORD */}
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
      </div>
    </main>
  );
}