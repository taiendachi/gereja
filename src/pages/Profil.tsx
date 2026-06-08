import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";

export const Sejarah = () => (
  <PageShell eyebrow="Profil" title="Sejarah Jemaat" description="Perjalanan iman BNKP Hilisimaetano dari masa ke masa.">
    <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground space-y-4">
      <p>BNKP Hilisimaetano berdiri sebagai bagian dari pelayanan Banua Niha Keriso Protestan di wilayah Nias Selatan, melayani warga jemaat di Desa Hilisimaetano, Kecamatan Maniamolo.</p>
      <p>Sejak awal kehadirannya, jemaat ini bertumbuh melalui pelayanan misi, pendidikan iman, dan kesaksian yang berakar pada Injil Kristus.</p>
      <p>Hingga kini, BNKP Hilisimaetano terus mengembangkan pelayanan bagi seluruh kategorial jemaat — anak-anak, remaja, pemuda, perempuan, kaum bapa, dan lansia — sebagai keluarga Allah yang saling menopang.</p>
    </div>
  </PageShell>
);

export const VisiMisi = () => (
  <PageShell eyebrow="Profil" title="Visi & Misi" description="Arah pelayanan jemaat BNKP Hilisimaetano.">
    <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
      <Card className="p-8 shadow-soft">
        <h3 className="text-2xl font-bold mb-3 text-primary">Visi</h3>
        <p className="text-muted-foreground leading-relaxed">
          Menjadi jemaat yang berakar, bertumbuh, dan berbuah di dalam Kristus serta menjadi berkat bagi masyarakat sekitar.
        </p>
      </Card>
      <Card className="p-8 shadow-soft">
        <h3 className="text-2xl font-bold mb-3 text-primary">Misi</h3>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside">
          <li>Memperdalam kehidupan rohani jemaat melalui ibadah dan firman.</li>
          <li>Membina seluruh kategorial jemaat secara berkesinambungan.</li>
          <li>Melaksanakan diakonia bagi yang membutuhkan.</li>
          <li>Memberitakan Injil dan menjadi terang bagi sekitar.</li>
        </ul>
      </Card>
    </div>
  </PageShell>
);

const struktur = [
  { title: "Pendeta Jemaat", name: "Pdt. Yafati Laia, M.Th" },
  { title: "Ketua BPMJ", name: "Bp. Faogosokhi Zai" },
  { title: "Sekretaris", name: "Ibu Sondrasi Telaumbanua" },
  { title: "Bendahara", name: "Bp. Atozisokhi Lase" },
  { title: "Bidang Pelayanan", name: "Bp. Yulianus Hia" },
  { title: "Bidang Pembinaan", name: "Ibu Eliyati Bu'ulolo" },
];

export const Struktur = () => (
  <PageShell eyebrow="Profil" title="Struktur Organisasi" description="Bagan kepemimpinan jemaat.">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
      {struktur.map((s) => (
        <Card key={s.title} className="p-5 shadow-soft text-center">
          <p className="text-sm text-primary font-semibold">{s.title}</p>
          <p className="font-semibold mt-1">{s.name}</p>
        </Card>
      ))}
    </div>
  </PageShell>
);
