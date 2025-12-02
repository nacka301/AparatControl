import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { inventorySchema } from "@/lib/validators";
import { assertApiRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await assertApiRole("owner");
  if (!("profile" in auth)) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const body = await request.json().catch(() => null);

  const parsed = inventorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Neispravni podaci" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("inventory").insert(parsed.data);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Inventar je dodan" });
}
