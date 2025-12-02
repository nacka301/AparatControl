import { requireRole } from "@/lib/auth";
import { fetchDashboardData, getLowStock } from "@/lib/queries";
import LowStockBanner from "@/components/LowStockBanner";
import InventoryCard from "@/components/InventoryCard";
import ApartmentCard from "@/components/ApartmentCard";
import TaskList from "@/components/tasks/TaskList";

export default async function OwnerDashboardPage() {
  await requireRole("owner");
  const data = await fetchDashboardData();
  const lowStock = getLowStock(data.inventory);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Owner dashboard</h1>
        <p className="text-muted-foreground">Pregled svih apartmana, inventara i zadataka.</p>
      </section>

      <LowStockBanner items={lowStock} />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Inventar</h2>
          <p className="text-sm text-muted-foreground">Stanje i upozorenja na low-stock.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {data.inventory.map((item) => (
            <InventoryCard key={item.id} item={item} />
          ))}
          {!data.inventory.length ? <p className="text-sm text-muted-foreground">Još nema unosa.</p> : null}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Apartmani</h2>
          <p className="text-sm text-muted-foreground">Brzi pregled svih jedinica.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {data.apartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
          {!data.apartments.length ? <p className="text-sm text-muted-foreground">Dodaj prvi apartman kroz Supabase.</p> : null}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Zadaci</h2>
          <p className="text-sm text-muted-foreground">Koordinacija timova.</p>
        </div>
        <TaskList tasks={data.tasks} />
      </section>
    </div>
  );
}
