import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Task } from "@/lib/types";

const STATUS_LABELS: Record<Task["status"], { label: string; variant: "default" | "secondary" | "destructive" }> = {
  open: { label: "Otvoreno", variant: "secondary" },
  in_progress: { label: "U tijeku", variant: "default" },
  completed: { label: "Očišćeno", variant: "secondary" },
  issue: { label: "Problem", variant: "destructive" },
};

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  if (!tasks.length) {
    return <p className="text-sm text-muted-foreground">Nema zadataka.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tasks.map((task) => {
        const badge = STATUS_LABELS[task.status];
        return (
          <Card key={task.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-semibold">{task.title}</CardTitle>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">{task.notes ?? "Bez dodatnih napomena"}</p>
              <div className="text-xs text-muted-foreground">
                <strong>Rok: </strong>
                {formatDate(task.due_date)}
              </div>
              {task.apartment?.name ? (
                <div className="text-xs text-muted-foreground">
                  <strong>Apartman: </strong>
                  {task.apartment.name}
                </div>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
