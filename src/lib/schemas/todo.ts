import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(200, "Judul maksimal 200 karakter"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  categoryId: z.string().nullable().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(200).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  deadline: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
