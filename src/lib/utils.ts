import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatQuantity(value: number, unit = "kom") {
  return `${value} ${unit}`.trim();
}

export function formatDate(value?: string | null) {
  if (!value) return "Bez roka";
  const parsed = new Date(value);
  return parsed.toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "short",
  });
}
