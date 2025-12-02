import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { roleHome } from "@/lib/roles";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  const destination = roleHome[profile.role] ?? "/dashboard";
  redirect(destination);
}
