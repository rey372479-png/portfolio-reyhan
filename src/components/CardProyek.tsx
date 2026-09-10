import Link from "next/link";
import type { ProyekItem } from "@/data/proyek";
import Badge from "./Badge";

interface CardProyekProps {
  proyek: ProyekItem;
}

export default function CardProyek({ proyek }: CardProyekProps) {
  return (
    <article className="project-card">
      <span>{proyek.id.padStart(2, "0")}</span>

      <h3>{proyek.judul}</h3>

      <p>{proyek.deskripsiSingkat}</p>

      <Badge label={proyek.kategori} />

      <div className="project-card-actions">
        <Link href={`/proyek/${proyek.id}`} className="project-link">
          Detail Project <span>→</span>
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
