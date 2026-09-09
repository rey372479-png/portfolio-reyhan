import Link from "next/link";

export default function TentangPage() {
  return (
    <main className="page">
      <div className="container">
        <p className="section-label">02 / ABOUT ME</p>

        <h1 className="section-title">
          Tentang
          <br />
          Saya.
        </h1>

        <p className="inner-intro">
          Mengenal lebih dekat siapa saya, apa yang sedang saya
          pelajari, dan ke mana saya ingin berkembang.
        </p>

        <div className="row g-4 mt-4">
          <div className="col-lg-8">
            <div className="about-panel h-100">
              <p>
                Nama saya <strong>M. Reyhan Purnomo Putra</strong>.
                Saya adalah siswa berusia 17 tahun yang bersekolah
                di SMKN 1 Kota Pasuruan.
              </p>

              <p>
                Saya memiliki ketertarikan terhadap teknologi,
                khususnya web development. Saat ini saya sedang
                mempelajari dan mengembangkan kemampuan menggunakan
                HTML, CSS, dan Next.js.
              </p>

              <p>
                Di luar dunia teknologi, saya juga tertarik dengan
                industri finansial, terutama forex trading dan
                investasi cryptocurrency dengan fokus utama pada
                Bitcoin.
              </p>

              <p>
                Saya memiliki mimpi untuk menjadi sukses di usia muda
                melalui bidang yang saya tekuni. Karena itu, saya
                terus berusaha belajar, membuat project, dan
                mengembangkan kemampuan sedikit demi sedikit.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="overview-card h-100">
              <span>PROFILE</span>

              <h3>Quick Facts</h3>

              <div className="profile-facts">
                <div>
                  <small>NAME</small>
                  <strong>M. Reyhan Purnomo Putra</strong>
                </div>

                <div>
                  <small>AGE</small>
                  <strong>17 Years Old</strong>
                </div>

                <div>
                  <small>SCHOOL</small>
                  <strong>SMKN 1 Kota Pasuruan</strong>
                </div>

                <div>
                  <small>LOCATION</small>
                  <strong>Pasuruan, Indonesia</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-panel mt-4">
          <p className="section-label">MY DIRECTION</p>

          <h2 className="mt-3">
            Build skills today,
            <br />
            build the future tomorrow.
          </h2>

          <div className="mt-4">
            <Link href="/keahlian" className="minimal-link">
              Explore My Skills →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}