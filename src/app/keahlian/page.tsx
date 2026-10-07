import Link from "next/link";

const skillGroups = [
  {
    number: "01",
    label: "BUILD",
    title: "Development",
    summary:
      "Core web stack used to create functional interfaces and maintainable project work.",
    items: ["Next.js", "TypeScript", "HTML / CSS", "Bootstrap", "Supabase"],
  },
  {
    number: "02",
    label: "DESIGN",
    title: "Interface",
    summary:
      "How information is organized, styled, and experienced by users in a thoughtful way.",
    items: ["UI Design", "Web Development", "Responsive Layout", "UX Thinking"],
  },
  {
    number: "03",
    label: "DATA",
    title: "Backend & Data",
    summary:
      "Learning how project data is managed, connected, and presented through a clean system.",
    items: ["Supabase", "Database Workflow", "Project Structure", "Content Organization"],
  },
  {
    number: "04",
    label: "EXPLORE",
    title: "Financial-market learning",
    summary:
      "A practical interest in understanding broader systems beyond programming itself.",
    items: ["Forex / financial-market learning", "Crypto / Bitcoin interest", "Investment learning"],
  },
];

const skillHighlights = [
  { name: "Next.js", note: "Main framework for building structured product experiences." },
  { name: "TypeScript", note: "Helpful in keeping code clearer, more consistent, and easier to scale." },
  { name: "HTML / CSS", note: "Still the backbone for layout, rhythm, and interface clarity." },
  { name: "Bootstrap", note: "Useful for fast front-end structure and responsive composition." },
  { name: "Supabase", note: "Used in data-driven projects and backend learning workflows." },
  { name: "UI Design", note: "Focused on readability, hierarchy, and meaningful visual direction." },
  { name: "Forex / financial-market learning", note: "An ongoing interest in risk, patterns, and decision-making." },
  { name: "Crypto / Bitcoin interest", note: "A personal exploration into digital assets and market behavior." },
];

export default function KeahlianPage() {
  return (
    <main className="page skills-page">
      <div className="container">
        <p className="section-label">03 / SKILLS</p>

        <div className="editorial-page-hero">
          <div>
            <h1 className="editorial-page-title">
              Technical focus.
              <span> Quietly sharpened.</span>
            </h1>
            <p className="inner-intro">
              Saya terus memperkuat kemampuan di bidang web development, UI,
              dan struktur produk — sambil menjaga rasa ingin tahu pada sistem
              yang lebih besar di luar layar.
            </p>
          </div>

          <div className="info-rail panel-surface">
            <p className="meta-kicker">CURRENT FOCUS</p>
            <p>
              Building cleaner interfaces, learning stronger systems, and staying
              open to growth beyond the screen.
            </p>
          </div>
        </div>

        <div className="skill-groups">
          {skillGroups.map((group) => (
            <article className="skill-group panel-surface" key={group.number}>
              <div className="skill-group-header">
                <span className="group-number">{group.number}</span>
                <span className="group-label">{group.label}</span>
              </div>
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
              <ul className="group-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="skill-showcase panel-surface" aria-label="Skill highlights">
          <div className="skill-showcase-header">
            <p className="section-label">SPECIALTIES</p>
            <h2>What I keep learning.</h2>
          </div>

          <div className="skill-highlight-grid">
            {skillHighlights.map((skill) => (
              <article className="skill-highlight" key={skill.name}>
                <span>{skill.name}</span>
                <p>{skill.note}</p>
              </article>
            ))}
          </div>
        </section>

        <Link href="/proyek" className="minimal-link page-next-link">
          View my projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}