import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Upiši valjanu email adresu"),
  password: z.string().min(6, "Minimalno 6 znakova"),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(3, "Minimalno 3 znaka"),
  role: z.enum(["owner", "staff"]),
});

export const inventorySchema = z.object({
  name: z.string().min(2),
  quantity: z.number().int().min(0),
  minimum_quantity: z.number().int().min(0),
  unit: z.string().min(1).max(10).default("kom"),
});

export const inventoryBulkSchema = z.array(
  inventorySchema.extend({ id: z.string().optional() })
);

export const problemReportSchema = z.object({
  taskId: z.string().min(1),
  notes: z.string().min(5),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type InventoryInput = z.infer<typeof inventorySchema>;
export type InventoryBulkInput = z.infer<typeof inventoryBulkSchema>;