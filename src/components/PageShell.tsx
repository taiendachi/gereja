import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

const PageShell = ({ eyebrow, title, description, children }: Props) => (
  <>
    <section className="bg-secondary/40 py-16 border-b border-border">
      <div className="container-prose text-center max-w-3xl">
        {eyebrow && <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">{eyebrow}</p>}
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">{title}</h1>
        {description && <p className="text-muted-foreground text-lg">{description}</p>}
      </div>
    </section>
    <section className="py-16 container-prose">{children}</section>
  </>
);

export default PageShell;
