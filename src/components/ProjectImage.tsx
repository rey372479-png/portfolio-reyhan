"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectImageProps {
  src?: string;
  alt: string;
  className: string;
}

export default function ProjectImage({
  src,
  alt,
  className,
}: ProjectImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  return (
    <div className={`project-image ${className}`}>
      {src && failedSrc !== src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 92vw, (max-width: 1199px) 45vw, 560px"
          unoptimized
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <div className="project-image-fallback" role="img" aria-label={alt}>
          <span aria-hidden="true">PROJECT / STUDY</span>
        </div>
      )}
    </div>
  );
}
