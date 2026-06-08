import { Card } from "@/components/ui/card";

const majelis = [
  { name: "Pdt. Yafati Laia, M.Th", role: "Pendeta Jemaat" },
  { name: "Bp. Faogosokhi Zai", role: "Ketua Majelis" },
  { name: "Ibu Sondrasi Telaumbanua", role: "Sekretaris" },
  { name: "Bp. Atozisokhi Lase", role: "Bendahara" },
  { name: "Bp. Yulianus Hia", role: "Anggota Majelis" },
  { name: "Ibu Eliyati Bu'ulolo", role: "Anggota Majelis" },
];

const Tentang = () => (
  <>
    <section className="bg-secondary/40 py-16 sm:py-20 border-b border-border">
      <div className="container-prose text-center max-w-3xl">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Tentang Kami</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">BNKP Hilisimaetano</h1>
        <p className="text-muted-foreground text-lg">
          Banua Niha Keriso Protestan — Resort 11, Desa Hilisimaetano, Kecamatan Maniamolo.
        </p>
      </div>
    </section>

    <section className="py-16 container-prose">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Sejarah Singkat</h2>
      <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
        <p>
          BNKP Hilisimaetano adalah jemaat di lingkungan Banua Niha Keriso Protestan yang melayani warga jemaat di Desa Hilisimaetano, Kecamatan Maniamolo, Kabupaten Nias Selatan.
        </p>
        <p>
          Sejak awal berdirinya, jemaat ini bertumbuh sebagai bagian dari pelayanan misi Gereja BNKP yang berakar pada kasih Kristus, melayani melalui ibadah, pembinaan, diakonia, dan kesaksian.
        </p>
        <p>
          Kini, BNKP Hilisimaetano terus mengembangkan pelayanan bagi semua kategorial jemaat — anak-anak Sekolah Minggu, pemuda, perempuan, kaum bapa, hingga lansia.
        </p>
      </div>
    </section>

    <section className="py-16 bg-secondary/40">
      <div className="container-prose grid gap-8 md:grid-cols-2">
        <Card className="p-8 shadow-soft">
          <h3 className="text-2xl font-bold mb-3 text-primary">Visi</h3>
          <p className="text-muted-foreground leading-relaxed">
            Menjadi jemaat yang berakar, bertumbuh, dan berbuah di dalam Kristus, serta menjadi berkat bagi masyarakat sekitar.
          </p>
        </Card>
        <Card className="p-8 shadow-soft">
          <h3 className="text-2xl font-bold mb-3 text-primary">Misi</h3>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Memperdalam kehidupan rohani jemaat melalui ibadah dan firman.</li>
            <li>Membina seluruh kategorial jemaat secara berkesinambungan.</li>
            <li>Melaksanakan diakonia kepada yang membutuhkan.</li>
            <li>Memberitakan Injil dan menjadi terang bagi sekitar.</li>
          </ul>
        </Card>
      </div>
    </section>

    <section className="py-16 container-prose">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Kepengurusan & Majelis</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {majelis.map((m) => (
          <Card key={m.name} className="p-5 shadow-soft border-border/60">
            <p className="font-semibold">{m.name}</p>
            <p className="text-sm text-primary">{m.role}</p>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default Tentang;
