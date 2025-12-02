import type { UserRole } from "@/lib/types";

export const roleHome: Record<UserRole, string> = {
  owner: "/dashboard",
  staff: "/staff",
};

export const protectedRoutes = ["/dashboard", "/staff"];

export function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}
