import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { warta } from "@/data/content";

const Warta = () => (
  <>
    <section className="bg-secondary/40 py-16 border-b border-border">
      <div className="container-prose text-center">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Warta Jemaat</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Kabar dari Jemaat</h1>
        <p className="text-muted-foreground">Pengumuman, agenda, dan informasi terbaru bagi warga jemaat.</p>
      </div>
    </section>

    <section className="py-16 container-prose">
      <div className="grid gap-6 md:grid-cols-2">
        {warta.map((w) => (
          <Card key={w.id} className="p-6 shadow-soft hover:shadow-card transition-smooth">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Calendar size={14} /> {w.date}
            </div>
            <h3 className="text-xl font-semibold mb-2">{w.title}</h3>
            <p className="text-muted-foreground">{w.excerpt}</p>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-12">
        <button className="h-9 w-9 rounded-md border border-border bg-background text-sm hover:bg-secondary">1</button>
        <button className="h-9 w-9 rounded-md border border-border bg-background text-sm hover:bg-secondary">2</button>
        <button className="h-9 w-9 rounded-md border border-border bg-background text-sm hover:bg-secondary">3</button>
      </div>
    </section>
  </>
);

export default Warta;
