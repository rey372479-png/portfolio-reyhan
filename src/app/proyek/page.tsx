import Link from "next/link";
import CardProyek from "@/components/CardProyek";
import { daftarProyek } from "@/data/proyek";

interface ProyekPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProyekPage({ searchParams }: ProyekPageProps) {
  const { category } = await searchParams;
  const categories = ["Semua", "Web", "Mobile", "Design"];
  const filteredProjects = category
    ? daftarProyek.filter(
        (proyek) => proyek.kategori.toLowerCase() === category.toLowerCase(),
      )
    : daftarProyek;

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
          Hubungi Saya <span>→</span>
        </Link>
      </div>
    </main>
  );
}