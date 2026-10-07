import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import { getProyekById } from "@/lib/proyek";

interface DetailProyekProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DetailProyekProps): Promise<Metadata> {
  const { id } = await params;
  const proyek = await getProyekById(id);

  if (!proyek) {
    return { title: "Proyek Tidak Ditemukan" };
  }

  return {
    title: proyek.judul,
    description: proyek.deskripsiSingkat,
    openGraph: {
      title: `${proyek.judul} | Portfolio M. Reyhan Purnomo Putra`,
      description: proyek.deskripsiSingkat,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: proyek.judul,
      description: proyek.deskripsiSingkat,
    },
  };
}

export default async function DetailProyekPage({
  params,
}: DetailProyekProps) {
  const { id } = await params;
  const proyek = await getProyekById(id);

  if (!proyek) {
    notFound();
  }

  const learningText =
    "Proyek ini memperkuat cara saya memahami struktur, estetika, dan tujuan dari setiap antarmuka yang dibuat. Saya belajar bahwa pengalaman pengguna yang baik dimulai dari keputusan yang jelas, bukan hanya visual yang menarik.";

  return (
    <main className="page detail-page">
      <div className="container">
        <Link href="/proyek" className="minimal-link project-back-link">
          <span aria-hidden="true">←</span> Kembali ke Project
        </Link>

        <article className="project-detail case-study panel-surface">
          <div className="project-detail-heading">
            <div>
              <p className="section-label">
                PROJECT / {proyek.id.padStart(2, "0")}
              </p>
              <h1 className="section-title">{proyek.judul}</h1>
            </div>
            <Badge label={proyek.kategori} />
          </div>

          <div className="case-study-grid">
            <section className="case-study-overview">
              <p className="section-label">INTRODUCTION</p>
              <p className="case-study-lead">{proyek.deskripsiSingkat}</p>
              <p className="project-detail-description">{proyek.deskripsiLengkap}</p>
            </section>

            <section className="project-detail-section">
              <p className="section-label">PROJECT INFORMATION</p>
              <div className="project-technologies">
                {proyek.teknologi.map((teknologi) => (
                  <span key={teknologi}>{teknologi}</span>
                ))}
              </div>
              <p className="case-study-note">
                Dibuat sebagai bagian dari proses belajar, eksperimen, dan penguatan
                skill dalam membangun pengalaman digital yang lebih tertata.
              </p>
            </section>
          </div>

          <div className="case-study-columns">
            <section className="case-study-block panel-surface">
              <p className="section-label">WHAT I BUILT</p>
              <p>{proyek.deskripsiLengkap}</p>
            </section>

            <section className="case-study-block panel-surface">
              <p className="section-label">WHAT I LEARNED</p>
              <p>{learningText}</p>
            </section>
          </div>

          {proyek.tautan ? (
            <a
              href={proyek.tautan}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-button editorial-button-light project-detail-link"
            >
              {proyek.labelTautan ?? "Open project"} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </article>
      </div>
    </main>
  );
}
