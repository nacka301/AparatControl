"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const items = [
  { id: "paper", label: "Papir" },
  { id: "coffee", label: "Kava" },
  { id: "soap", label: "Sapun" },
];

export default function InventoryQuickForm() {
  const [values, setValues] = useState<Record<string, number>>({ paper: 0, coffee: 0, soap: 0 });
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateValue(id: string, value: number) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit() {
    setMessage(null);
    startTransition(async () => {
      const payload = items.map((item) => ({
        name: item.label,
        quantity: values[item.id],
        minimum_quantity: 5,
        unit: "kom",
      }));

      const res = await fetch("/api/inventory/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ message: "Greška" }));
        setMessage(body.message ?? "Greška pri spremanju");
        return;
      }

      setMessage("Inventar je ažuriran");
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <Label htmlFor={item.id}>{item.label}</Label>
            <Input
              id={item.id}
              type="number"
              min={0}
              value={values[item.id] ?? 0}
              onChange={(event) => updateValue(item.id, Number(event.target.value))}
            />
          </div>
        ))}
      </div>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      <Button type="button" className="w-full" onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Spremam..." : "Spremi stanje"}
      </Button>
    </div>
  );
}
