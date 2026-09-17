import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import { getProyekById } from "@/lib/proyek";

interface DetailProyekProps {
  params: Promise<{ id: string }>;
}

export default async function DetailProyekPage({
  params,
}: DetailProyekProps) {
  const { id } = await params;
  const proyek = await getProyekById(id);

  if (!proyek) {
    notFound();
  }

  return (
    <main className="page">
      <div className="container">
        <Link href="/proyek" className="minimal-link project-back-link">
          <span>←</span> Kembali ke Project
        </Link>

        <article className="project-detail">
          <div className="project-detail-heading">
            <div>
              <p className="section-label">
                PROJECT {proyek.id.padStart(2, "0")}
              </p>
              <h1 className="section-title">{proyek.judul}</h1>
            </div>
            <Badge label={proyek.kategori} />
          </div>

          <p className="project-detail-description">
            {proyek.deskripsiLengkap}
          </p>

          <div className="project-detail-section">
            <p className="section-label">TECHNOLOGIES</p>
            <div className="project-technologies">
              {proyek.teknologi.map((teknologi) => (
                <span key={teknologi}>{teknologi}</span>
              ))}
            </div>
          </div>

          {proyek.tautan ? (
            <a
              href={proyek.tautan}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-primary project-detail-link"
            >
              {proyek.labelTautan} <span>↗</span>
            </a>
          ) : null}
        </article>
      </div>
    </main>
  );
}
