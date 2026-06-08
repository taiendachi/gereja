import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Calendar, BadgeCheck } from "lucide-react";
import { pendeta, bpmj, bppj, snk, type PersonRow, type SnkRow } from "@/data/personalia";

/* ---------- PENDETA ---------- */
export const Pendeta = () => (
  <PageShell eyebrow="Personalia" title="Data Pendeta" description="Para pendeta yang melayani di BNKP Hilisimaetano.">
    <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pendeta.map((p) => (
        <Card key={p.no} className="overflow-hidden shadow-soft hover:shadow-card transition-smooth">
          <div className="aspect-square bg-secondary/40 overflow-hidden">
            <img
              src={p.foto}
              alt={`Foto ${p.nama}`}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
            />
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-base leading-snug">{p.nama}</h3>
              <Badge variant="secondary" className="shrink-0">{p.jk}</Badge>
            </div>
            <p className="text-primary text-sm font-medium mb-3">{p.jabatan}</p>
            <dl className="text-xs space-y-1.5 text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt>TTL</dt><dd className="text-right text-foreground/80">{p.ttl}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="flex items-center gap-1"><Calendar size={12} />Periode</dt>
                <dd className="text-right text-foreground/80">{p.periode}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Pelantikan</dt><dd className="text-right text-foreground/80">{p.pelantikan}</dd>
              </div>
              <div className="flex justify-between gap-2 pt-1.5 border-t border-border/60">
                <dt className="flex items-center gap-1"><BadgeCheck size={12} />Status</dt>
                <dd><Badge className="text-[10px]">{p.status}</Badge></dd>
              </div>
            </dl>
          </div>
        </Card>
      ))}
    </div>
    <p className="text-center text-xs text-muted-foreground mt-8">
      Untuk mengubah foto pendeta, edit URL pada <code className="px-1.5 py-0.5 rounded bg-secondary">src/data/personalia.ts</code>.
    </p>
  </PageShell>
);

/* ---------- Reusable PersonTable ---------- */
const PersonTable = ({ rows }: { rows: PersonRow[] }) => (
  <>
    <Card className="hidden md:block shadow-soft overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/60">
            <TableHead className="w-12">No</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead className="w-12">L/P</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>No. HP/WA</TableHead>
            <TableHead>Periode</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.no}>
              <TableCell className="font-medium">{r.no}</TableCell>
              <TableCell>
                <div className="font-semibold">{r.nama}</div>
                {r.alias && <div className="text-xs text-muted-foreground">{r.alias}</div>}
              </TableCell>
              <TableCell><Badge variant="secondary">{r.jk}</Badge></TableCell>
              <TableCell className="text-sm">{r.jabatan}</TableCell>
              <TableCell className="font-mono text-xs">{r.hp}</TableCell>
              <TableCell className="text-sm">{r.periode}</TableCell>
              <TableCell><Badge>{r.status}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>

    <div className="md:hidden grid gap-4">
      {rows.map((r) => (
        <Card key={r.no} className="p-5 shadow-soft">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="font-bold leading-snug">{r.nama}</p>
              {r.alias && <p className="text-xs text-muted-foreground">{r.alias}</p>}
            </div>
            <Badge variant="secondary">{r.jk}</Badge>
          </div>
          <p className="text-sm text-primary font-medium mb-3">{r.jabatan}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Phone size={12} />{r.hp || "—"}</span>
            <span>{r.periode}</span>
          </div>
        </Card>
      ))}
    </div>
  </>
);

export const BPMJ = () => (
  <PageShell eyebrow="Personalia" title="BPMJ" description="Badan Pekerja Majelis Jemaat BNKP Hilisimaetano.">
    <div className="max-w-6xl mx-auto"><PersonTable rows={bpmj} /></div>
  </PageShell>
);

export const BPPJ = () => (
  <PageShell eyebrow="Personalia" title="BPPJ" description="Badan Pengawas Penatalayanan Jemaat.">
    <div className="max-w-6xl mx-auto"><PersonTable rows={bppj} /></div>
  </PageShell>
);

/* ---------- SNK Lingkungan ---------- */
export const SNKLingkungan = () => {
  const totalKK = snk.reduce((s, r) => s + r.jlhKK, 0);
  const totalJiwa = snk.reduce((s, r) => s + r.jlhJiwa, 0);
  return (
    <PageShell eyebrow="Personalia" title="SNK Lingkungan" description="Daftar Satua Niha Keriso (SNK) per lingkungan.">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Total SNK", value: snk.length },
            { label: "Total KK", value: totalKK },
            { label: "Total Jiwa", value: totalJiwa },
          ].map((s) => (
            <Card key={s.label} className="p-4 sm:p-5 shadow-soft text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
            </Card>
          ))}
        </div>

        <Card className="hidden md:block shadow-soft overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/60">
                <TableHead className="w-12">No</TableHead>
                <TableHead>Nama Lengkap</TableHead>
                <TableHead className="w-12">L/P</TableHead>
                <TableHead>Lingkungan</TableHead>
                <TableHead className="text-center">KK</TableHead>
                <TableHead className="text-center">Jiwa</TableHead>
                <TableHead>No. HP/WA</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {snk.map((r: SnkRow) => (
                <TableRow key={r.no}>
                  <TableCell className="font-medium">{r.no}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{r.nama}</div>
                    {r.alias && <div className="text-xs text-muted-foreground">{r.alias}</div>}
                  </TableCell>
                  <TableCell><Badge variant="secondary">{r.jk}</Badge></TableCell>
                  <TableCell className="text-sm">{r.lingkungan}</TableCell>
                  <TableCell className="text-center font-semibold">{r.jlhKK}</TableCell>
                  <TableCell className="text-center font-semibold">{r.jlhJiwa}</TableCell>
                  <TableCell className="font-mono text-xs">{r.hp}</TableCell>
                  <TableCell><Badge>{r.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="md:hidden grid gap-4">
          {snk.map((r) => (
            <Card key={r.no} className="p-5 shadow-soft">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-bold">{r.nama}</p>
                  {r.alias && <p className="text-xs text-muted-foreground">{r.alias}</p>}
                </div>
                <Badge variant="secondary">{r.jk}</Badge>
              </div>
              <p className="text-sm text-primary font-medium mb-3">{r.lingkungan}</p>
              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <p className="font-bold text-base text-foreground">{r.jlhKK}</p>
                  <p className="text-muted-foreground">KK</p>
                </div>
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <p className="font-bold text-base text-foreground">{r.jlhJiwa}</p>
                  <p className="text-muted-foreground">Jiwa</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone size={12} />{r.hp || "—"}</p>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
};
