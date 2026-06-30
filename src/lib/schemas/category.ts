import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(50, "Nama maksimal 50 karakter"),
  color: z.string().default("#2563EB"),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  color: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
