import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { assertApiRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "issues";

export async function POST(request: Request) {
  const auth = await assertApiRole(["owner", "staff"]);
  if (!("profile" in auth)) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const formData = await request.formData();
  const taskId = formData.get("taskId");

  if (typeof taskId !== "string" || !taskId) {
    return NextResponse.json({ message: "Nedostaje taskId" }, { status: 400 });
  }

  const status = typeof formData.get("status") === "string" ? (formData.get("status") as string) : "completed";
  const notes = typeof formData.get("notes") === "string" ? (formData.get("notes") as string) : null;
  const supabase = createAdminClient();

  let imageUrl: string | null = null;
  const maybeFile = formData.get("image");

  if (maybeFile instanceof File && maybeFile.size > 0) {
    const arrayBuffer = await maybeFile.arrayBuffer();
    const path = `reports/${taskId}-${Date.now()}-${maybeFile.name.replace(/\s+/g, "-")}`;
    const upload = await supabase.storage
      .from(BUCKET)
      .upload(path, Buffer.from(arrayBuffer), {
        contentType: maybeFile.type || "image/jpeg",
        upsert: true,
      });

    if (upload.error) {
      return NextResponse.json({ message: upload.error.message }, { status: 500 });
    }

    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      status,
      notes,
      issue_image_url: imageUrl,
      completed_at: status === "completed" ? new Date().toISOString() : null,
    })
    .eq("id", taskId);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Zadatak ažuriran" });
}
