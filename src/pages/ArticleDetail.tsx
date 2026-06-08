import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/content";

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container-prose py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Artikel tidak ditemukan</h1>
        <Button asChild><Link to="/renungan">Kembali ke daftar</Link></Button>
      </div>
    );
  }

  return (
    <article className="py-16 container-prose max-w-3xl">
      <Link to="/renungan" className="inline-flex items-center gap-2 text-primary mb-8 hover:gap-3 transition-smooth">
        <ArrowLeft size={16} /> Kembali ke Renungan
      </Link>
      <p className="text-sm text-muted-foreground mb-3">{article.date}</p>
      <h1 className="text-3xl sm:text-5xl font-bold mb-5">{article.title}</h1>
      {article.verse && (
        <blockquote className="border-l-4 border-accent pl-5 py-2 italic text-accent mb-8">
          {article.verse}
        </blockquote>
      )}
      <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
        {article.content.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
};

export default ArticleDetail;
