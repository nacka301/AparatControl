import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { assertApiRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await assertApiRole();
  if (!("profile" in auth)) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("inventory")
    .select("id, name, quantity, minimum_quantity, unit, updated_at")
    .order("name");

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}
