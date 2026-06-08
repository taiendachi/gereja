import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import logo from "@/assets/bnkp-logo.png";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) nav("/admin", { replace: true });
  }, [user, isAdmin, loading, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success("Berhasil masuk");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-md p-8 shadow-card">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="BNKP" className="h-14 w-14 mb-3" />
          <h1 className="font-display text-2xl font-bold">Panel Admin</h1>
          <p className="text-sm text-muted-foreground">BNKP Hilisimaetano</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6}
              value={password} onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password" />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Memproses..." : "Masuk"}
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Pendaftaran ditutup. Hubungi admin untuk dibuatkan akun.
        </p>
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary">
            ← Kembali ke beranda
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;