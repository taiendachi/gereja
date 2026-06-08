import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import hero from "@/assets/church-hero.jpg";

const photos = [
  { src: hero, caption: "Gedung Gereja BNKP Hilisimaetano" },
  { src: g1, caption: "Ibadah Minggu" },
  { src: g2, caption: "Sekolah Minggu" },
  { src: g4, caption: "Paduan Suara Jemaat" },
  { src: g3, caption: "Saat Teduh" },
  { src: g1, caption: "Persekutuan Doa" },
];

const Galeri = () => (
  <>
    <section className="bg-secondary/40 py-16 border-b border-border">
      <div className="container-prose text-center">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Galeri</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Dokumentasi Pelayanan</h1>
        <p className="text-muted-foreground">Momen-momen indah kebersamaan jemaat BNKP Hilisimaetano.</p>
      </div>
    </section>

    <section className="py-16 container-prose">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <figure key={i} className="group rounded-xl overflow-hidden shadow-soft">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.src} alt={p.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
            </div>
            <figcaption className="p-3 text-sm text-muted-foreground bg-card">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  </>
);

export default Galeri;
