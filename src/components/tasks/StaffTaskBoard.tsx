"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Task } from "@/lib/types";

interface Props {
  tasks: Task[];
}

export default function StaffTaskBoard({ tasks }: Props) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleComplete(taskId: string) {
    setMessage(null);
    setPendingId(taskId);
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("status", "completed");

    const res = await fetch("/api/tasks/complete", {
      method: "POST",
      body: formData,
    });

    setPendingId(null);

    if (!res.ok) {
      const payload = await res.json().catch(() => ({ message: "Greška" }));
      setMessage(payload.message ?? "Greška pri spremanju");
      return;
    }

    setMessage("Zadatak obilježen kao očišćen");
  }

  if (!tasks.length) {
    return <p className="text-sm text-muted-foreground">Nema zadataka.</p>;
  }

  return (
    <div className="space-y-4">
      {message ? <p className="text-sm text-primary">{message}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-semibold">{task.title}</CardTitle>
              <Badge variant={task.status === "completed" ? "secondary" : "default"}>{task.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>{task.notes ?? "Bez napomena"}</p>
              {task.apartment?.name ? (
                <p className="text-xs text-muted-foreground">Apartman: {task.apartment.name}</p>
              ) : null}
              <p className="text-xs text-muted-foreground">Rok: {formatDate(task.due_date)}</p>
              <Button
                type="button"
                size="sm"
                className="w-full"
                onClick={() => handleComplete(task.id)}
                disabled={pendingId === task.id || task.status === "completed"}
              >
                {pendingId === task.id ? "Spremam..." : "Očišćeno"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
