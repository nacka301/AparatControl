import { cache } from "react";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/types";
import { roleHome } from "@/lib/roles";

export const getProfile = cache(async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Neuspješno dohvaćanje profila", error.message);
  }

  return {
    id: user.id,
    email: user.email,
    full_name: data?.full_name ?? user.email ?? "Korisnik",
    role: (data?.role as UserRole | null) ?? "staff",
  };
});

export async function requireRole(role: UserRole) {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role !== role) {
    redirect(roleHome[profile.role]);
  }

  return profile;
}

type ApiProfileResult =
  | { profile: Awaited<ReturnType<typeof getProfile>> }
  | { error: string; status: number };

async function fetchProfileOnce() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("users")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email,
    full_name: data?.full_name ?? user.email ?? "Korisnik",
    role: (data?.role as UserRole | null) ?? "staff",
  };
}

export async function getApiProfile(): Promise<Awaited<ReturnType<typeof fetchProfileOnce>>> {
  return fetchProfileOnce();
}

export async function assertApiRole(required?: UserRole | UserRole[]): Promise<ApiProfileResult> {
  const profile = await fetchProfileOnce();

  if (!profile) {
    return { error: "Nije prijavljen", status: 401 };
  }

  if (required) {
    const roles = Array.isArray(required) ? required : [required];
    if (!roles.includes(profile.role)) {
      return { error: "Nedovoljno ovlasti", status: 403 };
    }
  }

  return { profile };
}
