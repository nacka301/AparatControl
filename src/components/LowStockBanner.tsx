import type { InventoryItem } from "@/lib/types";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  items: InventoryItem[];
  className?: string;
}

export default function LowStockBanner({ items, className }: Props) {
  if (!items.length) return null;

  return (
    <div className={cn("flex items-center gap-3 rounded-xl border border-destructive bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive", className)}>
      <AlertCircle className="h-5 w-5" />
      <span>
        Upozorenje: sljedeće stavke su ispod minimuma: {items.map((item) => item.name).join(", ")}
      </span>
    </div>
  );
}
