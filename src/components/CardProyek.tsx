import Link from "next/link";
import type { ProyekItem } from "@/data/proyek";
import Badge from "./Badge";
import ProjectImage from "./ProjectImage";

interface CardProyekProps {
  proyek: ProyekItem;
}

export default function CardProyek({ proyek }: CardProyekProps) {
  return (
    <article className="project-card has-project-image">
      <ProjectImage
        src={proyek.imageUrl}
        alt={`Gambar proyek ${proyek.judul}`}
        className="project-card-image"
      />
      <div className="project-card-top">
        <span className="project-card-number">{proyek.id.padStart(2, "0")}</span>
        <Badge label={proyek.kategori} />
      </div>

      <h3>{proyek.judul}</h3>

      <p>{proyek.deskripsiSingkat}</p>

      <div className="project-card-tech" aria-label="Teknologi proyek">
        {proyek.teknologi.map((teknologi) => (
          <span key={teknologi}>{teknologi}</span>
        ))}
      </div>

      <div className="project-card-actions">
        <Link href={`/proyek/${proyek.id}`} className="project-link">
          Explore project <span>↗</span>
        </Link>

        {proyek.tautan ? (
          <a
            href={proyek.tautan}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {proyek.labelTautan} ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
