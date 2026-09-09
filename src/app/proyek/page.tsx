export default function ProyekPage() {
  return (
    <main className="page">
      <div className="container">
        <p className="section-label">04 / SELECTED WORK</p>

        <h1 className="section-title">
          Project
          <br />
          Saya.
        </h1>

        <p className="inner-intro">
          Beberapa project yang pernah saya kerjakan selama belajar
          web development dan UI design.
        </p>

        <div className="projects-grid">
          {/* PROJECT 01 */}
          <div className="project-card">
            <span>01</span>

            <h3>Manajemen Siswa</h3>

            <p>
              Website untuk mengelola dan menampilkan data siswa
              secara lebih terstruktur.
            </p>

            <div className="project-tag">
              WEB DEVELOPMENT
            </div>
          </div>

          {/* PROJECT 02 */}
          <div className="project-card">
            <span>02</span>

            <h3>Manajemen Magang</h3>

            <p>
              Sistem untuk membantu pengelolaan data dan kegiatan
              siswa selama proses magang.
            </p>

            <div className="project-tag">
              WEB DEVELOPMENT
            </div>
          </div>

          {/* PROJECT 03 */}
          <div className="project-card">
            <span>03</span>

            <h3>NextJS V2</h3>

            <p>
              Project website menggunakan Next.js sebagai
              pengembangan dari project sebelumnya.
            </p>

            <div className="project-tag">
              NEXT.JS
            </div>
          </div>

          {/* PROJECT 04 - MY APP */}
          <div className="project-card">
            <span>04</span>

            <h3>My App</h3>

            <p>
              Project aplikasi yang saya kerjakan sebagai bagian
              dari pembelajaran dan pengembangan kemampuan saya.
            </p>

            <a
              href="https://myapp-reyhan-purnomo-putra1-c1larj6je-rr-7229.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Open My App ↗
            </a>

            <div className="project-tag">
              WEB APPLICATION
            </div>
          </div>

          {/* PROJECT 05 - FIGMA MOBILE */}
          <div className="project-card">
            <span>05</span>

            <h3>Mobile UI Design</h3>

            <p>
              Project desain interface aplikasi mobile yang dibuat
              menggunakan Figma.
            </p>

            <a
              href="https://swore-raven-74257261.figma.site/#/mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View Mobile Design ↗
            </a>

            <div className="project-tag">
              FIGMA / MOBILE
            </div>
          </div>

          {/* PROJECT 06 - FIGMA WEB */}
          <div className="project-card">
            <span>06</span>

            <h3>Web UI Design</h3>

            <p>
              Project desain interface website yang dibuat dengan
              memperhatikan struktur dan tampilan pengguna.
            </p>

            <a
              href="https://swore-raven-74257261.figma.site/#/web"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View Web Design ↗
            </a>

            <div className="project-tag">
              FIGMA / WEB
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}