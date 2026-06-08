import { Card } from "@/components/ui/card";

const weekly = [
  { day: "Minggu", items: [
    { name: "Sekolah Minggu", time: "08.00 WIB" },
    { name: "Ibadah Umum", time: "09.00 WIB" },
    { name: "Ibadah Pemuda", time: "17.00 WIB" },
  ]},
  { day: "Rabu", items: [{ name: "Ibadah Keluarga / Rabuan", time: "19.00 WIB" }] },
  { day: "Jumat", items: [{ name: "Ibadah Doa", time: "19.00 WIB" }] },
  { day: "Sabtu", items: [{ name: "Latihan Paduan Suara", time: "16.00 WIB" }] },
];

const monthly = [
  { name: "Perjamuan Kudus", time: "Minggu pertama setiap bulan" },
  { name: "Ibadah Kategorial Perempuan", time: "Sabtu kedua setiap bulan, 15.00 WIB" },
  { name: "Ibadah Kategorial Bapa", time: "Sabtu ketiga setiap bulan, 19.00 WIB" },
];

const Jadwal = () => (
  <>
    <section className="bg-secondary/40 py-16 border-b border-border">
      <div className="container-prose text-center">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Jadwal Ibadah</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Jadwal Pelayanan Mingguan</h1>
        <p className="text-muted-foreground">Mari hadir dan beribadah bersama keluarga BNKP Hilisimaetano.</p>
      </div>
    </section>

    <section className="py-16 container-prose">
      <div className="grid gap-6 md:grid-cols-2">
        {weekly.map((d) => (
          <Card key={d.day} className="p-6 shadow-soft">
            <h3 className="text-xl font-bold text-primary mb-4">{d.day}</h3>
            <ul className="divide-y divide-border">
              {d.items.map((i) => (
                <li key={i.name} className="flex justify-between py-3 text-sm">
                  <span className="text-foreground">{i.name}</span>
                  <span className="text-muted-foreground">{i.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-14 mb-6">Agenda Bulanan</h2>
      <Card className="p-6 shadow-soft">
        <ul className="divide-y divide-border">
          {monthly.map((m) => (
            <li key={m.name} className="flex justify-between py-3 text-sm">
              <span className="font-medium">{m.name}</span>
              <span className="text-muted-foreground">{m.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  </>
);

export default Jadwal;
