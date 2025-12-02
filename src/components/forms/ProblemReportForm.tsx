"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Task } from "@/lib/types";

interface Props {
  tasks: Task[];
}

export default function ProblemReportForm({ tasks }: Props) {
  const [isPending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [taskId, setTaskId] = useState(tasks[0]?.id ?? "");
  const [notes, setNotes] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taskId) {
      setMessage("Odaberi zadatak");
      return;
    }

    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("status", "issue");
    formData.append("notes", notes);
    if (file) {
      formData.append("image", file);
    }

    setPending(true);
    setMessage(null);

    const res = await fetch("/api/tasks/complete", {
      method: "POST",
      body: formData,
    });

    setPending(false);

    if (!res.ok) {
      const payload = await res.json().catch(() => ({ message: "Greška" }));
      setMessage(payload.message ?? "Greška pri spremanju");
      return;
    }

    setMessage("Prijava problema je poslana");
    setNotes("");
    setFile(null);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="taskId">Zadatak</Label>
        <select
          id="taskId"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={taskId}
          onChange={(event) => setTaskId(event.target.value)}
        >
          <option value="">Odaberi...</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Opis problema</Label>
        <Textarea id="notes" value={notes} onChange={(event) => setNotes(event.target.value)} required minLength={5} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Fotografija</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
      </div>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Šaljem..." : "Pošalji prijavu"}
      </Button>
    </form>
  );
}
