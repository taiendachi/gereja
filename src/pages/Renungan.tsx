import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/content";

const Renungan = () => (
  <>
    <section className="bg-secondary/40 py-16 border-b border-border">
      <div className="container-prose text-center">
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Renungan & Artikel</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Firman untuk Hari Ini</h1>
        <p className="text-muted-foreground">Renungan singkat dan artikel pembinaan rohani.</p>
      </div>
    </section>

    <section className="py-16 container-prose">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Card key={a.slug} className="p-6 shadow-soft hover:shadow-card transition-smooth flex flex-col">
            <p className="text-xs text-muted-foreground mb-2">{a.date}</p>
            <h3 className="text-xl font-semibold mb-2">{a.title}</h3>
            {a.verse && <p className="text-sm text-accent italic mb-3">{a.verse}</p>}
            <p className="text-muted-foreground text-sm mb-5 flex-1">{a.excerpt}</p>
            <Link to={`/renungan/${a.slug}`} className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-smooth">
              Baca Selengkapnya <ArrowRight size={16} />
            </Link>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default Renungan;
