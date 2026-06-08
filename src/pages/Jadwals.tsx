import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Clock, MapPin, Users, BookOpen, Palette } from "lucide-react";
import { ibadahMinggu, kebaktianRT, sekolahMinggu, sekolahSidi } from "@/data/jadwal";

/* ---------- IBADAH MINGGU ---------- */
export const IbadahMinggu = () => {
  const i = ibadahMinggu;
  const liturgi: { label: string; value: string; icon?: React.ReactNode }[] = [
    { label: "Nama Minggu", value: i.namaMinggu, icon: <CalendarDays size={16} /> },
    { label: "Agendre", value: i.agendre, icon: <BookOpen size={16} /> },
    { label: "Warna Kain Altar", value: i.warnaKain, icon: <Palette size={16} /> },
    { label: "Salahi Goroisa", value: i.salahiGoroisa },
    { label: "Föna Huhuo", value: i.fonaHuhuo },
    { label: "Huhuo", value: i.huhuo },
    { label: "Nitanö Badödö", value: i.nitanoBadodo },
  ];

  return (
    <PageShell eyebrow="Jadwal" title="Ibadah Minggu" description={`Tata ibadah dan pelayan untuk Minggu, ${i.tanggal}.`}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Liturgi Card */}
        <Card className="p-6 sm:p-8 shadow-soft">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <h2 className="text-xl font-bold text-primary">Tata Liturgi</h2>
            <Badge variant="secondary" className="text-xs">{i.tanggal}</Badge>
          </div>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {liturgi.map((row) => (
              <div key={row.label} className="border-b border-border/60 pb-3">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  {row.icon}{row.label}
                </dt>
                <dd className="font-semibold text-foreground mt-1">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-lg bg-secondary/50 p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Nats Hafalan</p>
            <ul className="space-y-2 text-sm font-medium">
              {i.natsHafalan.map((n, idx) => (
                <li key={idx} className="leading-relaxed">{n}</li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Sesi pelayanan */}
        <div className="grid md:grid-cols-2 gap-6">
          {i.sesi.map((s) => (
            <Card key={s.nama} className="p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary">{s.nama}</h3>
                <Badge>{s.bahasa}</Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-4">
                <Clock size={14} /> {s.waktu}
              </p>
              <dl className="text-sm space-y-2">
                {[
                  ["Pengkhotbah", s.pengkhotbah],
                  ["Liturgis", s.liturgis],
                  ["Pemusik", s.pemusik],
                  ["Proyeksionis", s.proyeksionis],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>

        {/* Song leader & kolektan */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2"><Users size={18} /> Song Leader</h3>
            <ol className="list-decimal pl-5 text-sm space-y-1.5">
              {i.songLeader.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </Card>
          <Card className="p-6 shadow-soft">
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2"><Users size={18} /> Kolektan</h3>
            <ul className="text-sm space-y-2">
              {i.kolektan.map((k) => (
                <li key={k.nama} className="flex justify-between border-b border-border/50 pb-1.5 last:border-0">
                  <span>{k.nama}</span>
                  <span className="text-muted-foreground text-xs">{k.tugas}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

/* ---------- KEBAKTIAN RUMAH TANGGA ---------- */
export const KebaktianRT = () => (
  <PageShell eyebrow="Jadwal" title="Kebaktian Rumah Tangga" description="Jadwal KRT per lingkungan minggu ini.">
    <div className="max-w-6xl mx-auto">
      {/* Desktop table */}
      <Card className="hidden md:block shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/60">
              <TableHead className="w-12">No</TableHead>
              <TableHead>Lingkungan</TableHead>
              <TableHead>Keluarga</TableHead>
              <TableHead>Tempat / Alamat</TableHead>
              <TableHead>Hari / Tanggal</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Pelayan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kebaktianRT.map((r) => (
              <TableRow key={r.no}>
                <TableCell className="font-medium">{r.no}</TableCell>
                <TableCell><Badge variant="secondary">{r.lingkungan}</Badge></TableCell>
                <TableCell className="font-medium">{r.keluarga}</TableCell>
                <TableCell className="text-muted-foreground">{r.tempat}</TableCell>
                <TableCell>{r.hari}</TableCell>
                <TableCell className="font-mono text-xs">{r.waktu}</TableCell>
                <TableCell>{r.pelayan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {kebaktianRT.map((r) => (
          <Card key={r.no} className="p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary">{r.lingkungan}</Badge>
              <span className="text-xs text-muted-foreground">#{r.no}</span>
            </div>
            <p className="font-bold mb-2">{r.keluarga}</p>
            <p className="text-sm text-muted-foreground flex items-start gap-2 mb-1.5"><MapPin size={14} className="mt-0.5 shrink-0" /> {r.tempat}</p>
            <p className="text-sm flex items-center gap-2 mb-1.5"><CalendarDays size={14} /> {r.hari}</p>
            <p className="text-sm flex items-center gap-2 mb-1.5"><Clock size={14} /> {r.waktu}</p>
            <p className="text-sm flex items-center gap-2 text-primary"><Users size={14} /> {r.pelayan}</p>
          </Card>
        ))}
      </div>
    </div>
  </PageShell>
);

/* ---------- SEKOLAH MINGGU ---------- */
export const SekolahMinggu = () => (
  <PageShell eyebrow="Jadwal" title="Sekolah Minggu" description={`Pelayanan Sekolah Minggu — ${sekolahMinggu.tanggal}.`}>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/60">
              <TableHead className="w-12">No</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Ruang</TableHead>
              <TableHead>Pelayan</TableHead>
              <TableHead className="text-right">Waktu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sekolahMinggu.rows.map((r) => (
              <TableRow key={r.no}>
                <TableCell className="font-medium">{r.no}</TableCell>
                <TableCell><Badge>{r.kelas}</Badge></TableCell>
                <TableCell>{r.ruang}</TableCell>
                <TableCell className="text-sm">{r.pelayan}</TableCell>
                <TableCell className="text-right font-mono text-xs">{r.waktu}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  </PageShell>
);

/* ---------- SEKOLAH SIDI (ruang hanya satu) ---------- */
export const SekolahSidi = () => (
  <PageShell eyebrow="Jadwal" title="Pendidikan Sekolah Sidi" description={`Jadwal katekisasi — ${sekolahSidi.tanggal}.`}>
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-6 shadow-soft bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Lokasi (ruang tunggal)</p>
            <p className="font-bold text-lg">{sekolahSidi.ruang}</p>
          </div>
        </div>
      </Card>

      <Card className="shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/60">
              <TableHead className="w-12">No</TableHead>
              <TableHead>Grup</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Pelayan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sekolahSidi.rows.map((r) => (
              <TableRow key={r.no}>
                <TableCell className="font-medium">{r.no}</TableCell>
                <TableCell><Badge variant="secondary">Grup {r.grup}</Badge></TableCell>
                <TableCell className="font-mono text-xs">{r.waktu}</TableCell>
                <TableCell>{r.pelayan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  </PageShell>
);
