export type UserRole = "owner" | "staff";

export type Apartment = {
  id: string;
  name: string;
  location?: string | null;
  cover_url?: string | null;
  notes?: string | null;
};

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  minimum_quantity: number;
  unit?: string | null;
  updated_at?: string | null;
};

export type TaskStatus = "open" | "in_progress" | "completed" | "issue";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  notes?: string | null;
  due_date?: string | null;
  issue_image_url?: string | null;
  apartment?: {
    name: string | null;
  } | null;
};

export type DashboardData = {
  apartments: Apartment[];
  inventory: InventoryItem[];
  tasks: Task[];
};

export type ActionState = {
  error?: string;
  success?: string;
};
