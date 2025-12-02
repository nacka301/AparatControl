import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
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
