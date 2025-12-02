"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "@/lib/validators";
import { roleHome } from "@/lib/roles";
import type { ActionState, UserRole } from "@/lib/types";

export async function loginAction(_: ActionState | undefined, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Neispravan unos" };
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    return { error: error?.message ?? "Neuspješna prijava" };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const role = (profile?.role as UserRole | undefined) ?? "staff";
  redirect(roleHome[role]);
}

export async function registerAction(_: ActionState | undefined, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Neispravan unos" };
  }

  const { email, password, fullName, role } = parsed.data;
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error || !data.user) {
    return { error: error?.message ?? "Neuspješna registracija" };
  }

  await supabase.from("users").upsert({
    id: data.user.id,
    full_name: fullName,
    role,
  });

  redirect(roleHome[role]);
}

export async function logoutAction() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}
