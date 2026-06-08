import { admin, corsHeaders, json, requireAdmin } from "../_shared/admin-auth.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    await requireAdmin(req);
    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    if (!email || !email.includes("@")) return json({ error: "Email tidak valid" }, 400);
    if (password.length < 8) return json({ error: "Password minimal 8 karakter" }, 400);

    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (createErr || !created.user) {
      return json({ error: createErr?.message ?? "Gagal membuat user" }, 400);
    }
    const { error: roleErr } = await admin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "admin" });
    if (roleErr) {
      await admin.auth.admin.deleteUser(created.user.id);
      return json({ error: roleErr.message }, 500);
    }
    return json({ id: created.user.id, email: created.user.email });
  } catch (e) {
    if (e instanceof Response) return e;
    return json({ error: String(e) }, 500);
  }
});