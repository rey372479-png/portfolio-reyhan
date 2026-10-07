import Link from "next/link";
import CounterApresiasi from "@/components/CounterApresiasi";

const journeyMoments = [
  {
    label: "01 / LEARN",
    title: "Curiosity started with code.",
    text:
      "Saya tumbuh sebagai seorang siswa yang tertarik bagaimana dunia digital dibangun — dari tampilan, alur kerja, sampai bagaimana sebuah ide bisa menjadi produk yang bisa dipakai orang lain.",
  },
  {
    label: "02 / BUILD",
    title: "I learn by making things real.",
    text:
      "Setiap project saya kerjakan menjadi proses eksplorasi. Saya belajar bagaimana membangun UI yang jelas, menyusun struktur yang rapi, dan membuat keputusan yang lebih matang saat bekerja dengan teknologi baru.",
  },
  {
    label: "03 / LEAD",
    title: "Leadership shaped the way I work.",
    text:
      "Saya pernah menjabat sebagai Former Head of Cadre Development di PR IPM SMP Muhammadiyah 1 Kota Pasuruan. Dari sana, saya belajar tentang tanggung jawab, komunikasi, dan bagaimana membangun sesuatu bersama orang lain.",
  },
  {
    label: "04 / EXPLORE",
    title: "The learning is wider than code.",
    text:
      "Di luar web development, saya juga tertarik pada forex, cryptocurrency, dan Bitcoin. Bagi saya, semua itu adalah cara untuk memahami sistem, keputusan, dan pola perubahan dalam kehidupan nyata.",
  },
];

export default function TentangPage() {
  return (
    <main className="page about-page">
      <div className="container">
        <p className="section-label">02 / ABOUT ME</p>

        <div className="editorial-page-hero">
          <div>
            <h1 className="editorial-page-title">
              Who is <span>Reyhan?</span>
            </h1>
            <p className="inner-intro">
              Saya adalah siswa, web developer, dan pembelajar yang lebih suka
              membangun sesuatu yang berarti dari proses yang konsisten.
            </p>
          </div>

          <div className="info-rail panel-surface">
            <p className="meta-kicker">PROFILE</p>
            <p>
              Student from Pasuruan, focused on web development, design thinking,
              and steady self-improvement.
            </p>
          </div>
        </div>

        <div className="story-board">
          <article className="story-feature panel-surface">
            <p className="section-label">01 / WHO I AM</p>
            <h2>
              I do not chase perfection.
              <span> I keep building with intention.</span>
            </h2>
            <p>
              Nama saya <strong>M. Reyhan Purnomo Putra</strong>. Saya adalah
              siswa SMKN 1 Kota Pasuruan yang tertarik pada teknologi, arsitektur
              antarmuka, dan cara berpikir yang sistematis dalam menyelesaikan
              masalah. Saya belajar melalui pengalaman nyata: menulis kode,
              merancang tampilan, dan memperbaiki proses di setiap iterasi.
            </p>
            <p>
              Saya juga tertarik pada pasar finansial, terutama forex,
              cryptocurrency, dan Bitcoin. Bagi saya, belajar tentang pasar
              memberi perspektif yang berbeda tentang risiko, analisis, dan
              pengambilan keputusan yang bijak.
            </p>
          </article>

          <aside className="profile-card panel-surface">
            <span className="meta-kicker">QUICK FACTS</span>
            <div className="profile-facts">
              <div>
                <small>NAME</small>
                <strong>M. Reyhan Purnomo Putra</strong>
              </div>
              <div>
                <small>SCHOOL</small>
                <strong>SMKN 1 Kota Pasuruan</strong>
              </div>
              <div>
                <small>LEADERSHIP</small>
                <strong>
                  Former Head of Cadre Development, PR IPM SMP Muhammadiyah 1
                  Kota Pasuruan
                </strong>
              </div>
              <div>
                <small>LOCATION</small>
                <strong>Pasuruan, Indonesia</strong>
              </div>
            </div>
          </aside>
        </div>

        <section className="timeline-stack" aria-label="Perjalanan pengembangan Reyhan">
          {journeyMoments.map((moment) => (
            <article className="timeline-item panel-surface" key={moment.label}>
              <span>{moment.label.split("/")[0].trim()}</span>
              <div>
                <p className="meta-kicker">{moment.label}</p>
                <h3>{moment.title}</h3>
                <p>{moment.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="philosophy-panel panel-surface">
          <div>
            <p className="section-label">03 / MINDSET</p>
            <h2>
              Build with calm focus,
              <br />
              learn without losing momentum.
            </h2>
          </div>
          <p>
            Saya percaya proses lebih penting daripada penampilan sesaat. Saya
            ingin belajar secara konsisten, menjaga rasa ingin tahu, dan membangun
            skill yang benar-benar berguna. Itu sebabnya saya terus membuat proyek,
            memahami kritik, dan mengevaluasi setiap langkah dengan jujur.
          </p>
        </section>

        <div className="cta-strip panel-surface">
          <div>
            <p className="meta-kicker">NEXT STEP</p>
            <h3>Still learning. Still growing.</h3>
          </div>
          <Link href="/keahlian" className="minimal-link">
            Explore my focus <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="appreciation-panel">
          <div>
            <p className="section-label">SUPPORT MY WORK</p>
            <p className="appreciation-copy">
              Klik tombol ini untuk memberi apresiasi pada portfolio saya.
            </p>
          </div>
          <CounterApresiasi />
        </div>
      </div>
    </main>
  );
}