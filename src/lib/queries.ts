import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { DashboardData, InventoryItem, Task } from "@/lib/types";

export async function fetchDashboardData(): Promise<DashboardData> {
  const supabase = createServerSupabaseClient();

  const [apartmentsRes, inventoryRes, tasksRes] = await Promise.all([
    supabase.from("apartments").select("id, name, location, cover_url, notes"),
    supabase
      .from("inventory")
      .select("id, name, quantity, minimum_quantity, unit, updated_at")
      .order("name"),
    supabase
      .from("tasks")
      .select("id, title, status, notes, due_date, issue_image_url, apartments(name)")
      .order("due_date", { ascending: true }),
  ]);

  return {
    apartments: apartmentsRes.data ?? [],
    inventory: inventoryRes.data ?? [],
    tasks: (tasksRes.data as Task[] | null) ?? [],
  };
}

export async function fetchStaffData(userId: string) {
  const supabase = createServerSupabaseClient();

  const [{ data: inventory }, { data: tasks }] = await Promise.all([
    supabase
      .from("inventory")
      .select("id, name, quantity, minimum_quantity, unit, updated_at")
      .order("name"),
    supabase
      .from("tasks")
      .select(
        "id, title, status, notes, due_date, issue_image_url, apartments(name)"
      )
      .or(`assigned_to.eq.${userId},assigned_to.is.null`)
      .order("due_date", { ascending: true }),
  ]);

  return {
    inventory: (inventory as InventoryItem[] | null) ?? [],
    tasks: (tasks as Task[] | null) ?? [],
  };
}

export function getLowStock(items: InventoryItem[], thresholdOffset = 0) {
  return items.filter((item) => item.quantity < item.minimum_quantity + thresholdOffset);
}
