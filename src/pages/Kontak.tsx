import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Kontak = () => {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan terkirim. Terima kasih!");
    setForm({ nama: "", email: "", pesan: "" });
  };

  return (
    <>
      <section className="bg-secondary/40 py-16 border-b border-border">
        <div className="container-prose text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Kontak</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Hubungi Kami</h1>
          <p className="text-muted-foreground">Kami senang mendengar dari Anda.</p>
        </div>
      </section>

      <section className="py-16 container-prose grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-6">Informasi</h2>
          <ul className="space-y-5">
            <li className="flex gap-4">
              <div className="h-10 w-10 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center shrink-0"><MapPin size={18} /></div>
              <div>
                <p className="font-semibold">Lokasi</p>
                <p className="text-muted-foreground text-sm">Desa Hilisimaetano, Kec. Maniamolo, Nias Selatan</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-10 w-10 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center shrink-0"><Phone size={18} /></div>
              <div>
                <p className="font-semibold">Telepon</p>
                <p className="text-muted-foreground text-sm">+62 811-2233-4455</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-10 w-10 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center shrink-0"><Mail size={18} /></div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground text-sm">kontak@bnkphilisimaetano.org</p>
              </div>
            </li>
          </ul>
        </div>

        <Card className="p-6 sm:p-8 shadow-card">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="nama">Nama</Label>
              <Input id="nama" required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="pesan">Pesan</Label>
              <Textarea id="pesan" rows={5} required value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" size="lg">Kirim Pesan</Button>
          </form>
        </Card>
      </section>
    </>
  );
};

export default Kontak;
