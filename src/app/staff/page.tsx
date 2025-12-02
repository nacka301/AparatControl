import { redirect } from "next/navigation";
import { getProfile } from "@/lib/auth";
import { fetchStaffData, getLowStock } from "@/lib/queries";
import StaffTaskBoard from "@/components/tasks/StaffTaskBoard";
import InventoryCard from "@/components/InventoryCard";
import InventoryQuickForm from "@/components/forms/InventoryQuickForm";
import ProblemReportForm from "@/components/forms/ProblemReportForm";
import LowStockBanner from "@/components/LowStockBanner";

export default async function StaffDashboardPage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  const data = await fetchStaffData(profile.id);
  const lowStock = getLowStock(data.inventory);

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Staff dashboard</h1>
        <p className="text-muted-foreground">Zadaci, inventar i prijave problema.</p>
      </section>

      <LowStockBanner items={lowStock} />

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Zadaci</h2>
          <StaffTaskBoard tasks={data.tasks} />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Brzi unos inventara</h2>
          <InventoryQuickForm />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Prijava problema</h2>
          <ProblemReportForm tasks={data.tasks} />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Stanje inventara</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.inventory.map((item) => (
              <InventoryCard key={item.id} item={item} />
            ))}
            {!data.inventory.length ? <p className="text-sm text-muted-foreground">Nema stavki.</p> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
