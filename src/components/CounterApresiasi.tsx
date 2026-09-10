"use client";

import { useState } from "react";

export default function CounterApresiasi() {
  const [skor, setSkor] = useState(0);

  return (
    <button
      type="button"
      className="appreciation-button"
      onClick={() => setSkor((nilai) => nilai + 1)}
    >
      Apresiasi <strong>{skor}</strong>
    </button>
  );
}
