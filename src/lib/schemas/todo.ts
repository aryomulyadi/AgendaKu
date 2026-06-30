import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(200, "Judul maksimal 200 karakter"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
