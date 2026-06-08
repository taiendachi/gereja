import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import hero from "@/assets/church-hero.jpg";

const photos = [
  { src: hero, caption: "Gedung Gereja" },
  { src: g1, caption: "Ibadah Minggu" },
  { src: g2, caption: "Sekolah Minggu" },
  { src: g4, caption: "Paduan Suara" },
  { src: g3, caption: "Saat Teduh" },
  { src: g1, caption: "Persekutuan Doa" },
];

const Grid = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    {photos.map((p, i) => (
      <figure key={i} className="group rounded-xl overflow-hidden shadow-soft">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={p.src} alt={p.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500" />
        </div>
        <figcaption className="p-3 text-sm text-muted-foreground bg-card">{p.caption}</figcaption>
      </figure>
    ))}
  </div>
);

export const Album = () => (
  <PageShell eyebrow="Galeri" title="Album" description="Kumpulan album foto pelayanan jemaat.">
    <Grid />
  </PageShell>
);

export const Kegiatan = () => (
  <PageShell eyebrow="Galeri" title="Kegiatan" description="Dokumentasi kegiatan jemaat BNKP Hilisimaetano.">
    <Grid />
  </PageShell>
);

const lagu = [
  { judul: "Nafasku Hanya untuk Memuji-Mu", kategori: "Pujian" },
  { judul: "Kasih-Mu Tuhan", kategori: "Penyembahan" },
  { judul: "Bagai Rusa Rindu Sungai-Mu", kategori: "Penyembahan" },
  { judul: "Hanya Engkau yang Layak", kategori: "Pujian" },
  { judul: "Ku Mau Cinta Yesus Selamanya", kategori: "Pujian" },
];

export const LirikLagu = () => (
  <PageShell eyebrow="Galeri" title="Lirik Lagu" description="Daftar lagu rohani untuk ibadah jemaat.">
    <div className="max-w-3xl mx-auto">
      <Card className="p-6 shadow-soft">
        <ul className="divide-y divide-border">
          {lagu.map((l) => (
            <li key={l.judul} className="flex justify-between py-3 text-sm">
              <span className="font-medium">{l.judul}</span>
              <span className="text-muted-foreground">{l.kategori}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-4 text-center italic">
          Lirik lengkap akan tersedia melalui buku nyanyian jemaat.
        </p>
      </Card>
    </div>
  </PageShell>
);
