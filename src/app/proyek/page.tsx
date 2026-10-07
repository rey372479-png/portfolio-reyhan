import Link from "next/link";
import CardProyek from "@/components/CardProyek";
import ProjectImage from "@/components/ProjectImage";
import { getProyek } from "@/lib/proyek";

interface ProyekPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProyekPage({ searchParams }: ProyekPageProps) {
  const { category } = await searchParams;
  const daftarProyek = await getProyek();
  const categories = ["Semua", "Web", "Mobile", "Design"];
  const filteredProjects = category
    ? daftarProyek.filter(
        (proyek) =>
          proyek.kategori.toLowerCase() === category.trim().toLowerCase(),
      )
    : daftarProyek;
  const featuredProject = daftarProyek[0];

  return (
    <main className="page projects-page">
      <div className="container">
        <p className="section-label">04 / SELECTED WORK</p>

        <div className="editorial-page-hero project-hero">
          <div>
            <h1 className="editorial-page-title">
              Work shaped by <span>curiosity.</span>
            </h1>
            <p className="inner-intro">
              Saya menempatkan setiap project sebagai pengalaman belajar: riset,
              komposisi, pengujian, dan penyempurnaan. Di bawah ini adalah enam
              karya yang mencerminkan proses itu.
            </p>
          </div>

          <div className="info-rail panel-surface">
            <p className="meta-kicker">PORTFOLIO SNAPSHOT</p>
            <p>Six deliberate projects spanning web interfaces, student management, and design exploration.</p>
          </div>
        </div>

        <article className="feature-project panel-surface">
          <ProjectImage
            src={featuredProject.imageUrl}
            alt={`Gambar proyek ${featuredProject.judul}`}
            className="feature-project-image"
          />
          <div className="feature-project-copy">
            <p className="meta-kicker">FEATURED PROJECT</p>
            <h2>{featuredProject.judul}</h2>
            <p>{featuredProject.deskripsiSingkat}</p>
            <div className="project-card-tech" aria-label="Teknologi proyek unggulan">
              {featuredProject.teknologi.map((teknologi) => (
                <span key={teknologi}>{teknologi}</span>
              ))}
            </div>
          </div>
          <div className="feature-project-actions">
            <Link href={`/proyek/${featuredProject.id}`} className="editorial-button editorial-button-light">
              Open case study <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>

        <div className="project-filters" aria-label="Filter kategori proyek">
          {categories.map((item) => {
            const isAll = item === "Semua";
            const href = isAll
              ? "/proyek"
              : `/proyek?category=${item.toLowerCase()}`;
            const isActive = isAll
              ? !category
              : category?.toLowerCase() === item.toLowerCase();

            return (
              <Link
                key={item}
                href={href}
                className={`project-filter${isActive ? " active" : ""}`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((proyek) => (
            <CardProyek key={proyek.id} proyek={proyek} />
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <p className="empty-projects">
            Belum ada project dalam kategori ini.
          </p>
        ) : null}

        <Link href="/kontak" className="minimal-link page-next-link">
          Let&apos;s talk <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}