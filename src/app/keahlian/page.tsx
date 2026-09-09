export default function KeahlianPage() {
  return (
    <main className="page">
      <div className="container">
        <p className="section-label">03 / SKILLS</p>

        <h1 className="section-title">
          Keahlian &
          <br />
          Fokus.
        </h1>

        <p className="inner-intro">
          Beberapa kemampuan dan bidang yang sedang saya pelajari
          dan kembangkan.
        </p>

        <div className="skills-grid">
          <div className="skill-card">
            <span className="skill-number">01</span>

            <h3>Next.js</h3>

            <p>
              Mempelajari pembuatan website dengan Next.js dan App
              Router untuk membangun aplikasi web modern.
            </p>
          </div>

          <div className="skill-card">
            <span className="skill-number">02</span>

            <h3>HTML &amp; CSS</h3>

            <p>
              Membuat struktur halaman website dan mengembangkan
              tampilan menggunakan CSS.
            </p>
          </div>

          <div className="skill-card">
            <span className="skill-number">03</span>

            <h3>Web Development</h3>

            <p>
              Mengembangkan berbagai project website sebagai bagian
              dari proses belajar pemrograman.
            </p>
          </div>

          <div className="skill-card">
            <span className="skill-number">04</span>

            <h3>Forex Trading</h3>

            <p>
              Mempelajari pergerakan market, analisis, strategi, dan
              manajemen risiko dalam trading forex.
            </p>
          </div>

          <div className="skill-card">
            <span className="skill-number">05</span>

            <h3>Crypto &amp; Bitcoin</h3>

            <p>
              Mempelajari cryptocurrency dengan fokus utama pada
              Bitcoin dan perkembangan ekosistem blockchain.
            </p>
          </div>

          <div className="skill-card">
            <span className="skill-number">06</span>

            <h3>UI Design</h3>

            <p>
              Mempelajari cara membuat tampilan interface yang
              terstruktur dan nyaman dilihat menggunakan Figma.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}