import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { InventoryItem } from "@/lib/types";

interface Props {
  item: InventoryItem;
}

export default function InventoryCard({ item }: Props) {
  const isLow = item.quantity < item.minimum_quantity;

  return (
    <Card className={isLow ? "border-destructive/50" : undefined}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
          <CardDescription>Minimum: {item.minimum_quantity}</CardDescription>
        </div>
        {isLow ? <Badge variant="destructive">Low stock</Badge> : <Badge variant="secondary">OK</Badge>}
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p className="text-2xl font-bold">{item.quantity}</p>
        <p className="text-muted-foreground">Jed. mjere: {item.unit ?? "kom"}</p>
        {item.updated_at ? <p className="text-xs text-muted-foreground">Zadnja izmjena: {new Date(item.updated_at).toLocaleDateString("hr-HR")}</p> : null}
      </CardContent>
    </Card>
  );
}
