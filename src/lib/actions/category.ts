"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  createCategorySchema,
  updateCategorySchema,
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "@/lib/schemas/category";

export async function getCategories() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.category.findMany({
    where: { userId: session.user.id },
    include: { _count: { select: { todos: true } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function createCategory(data: CreateCategoryInput) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validated = createCategorySchema.safeParse(data);
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const category = await prisma.category.create({
    data: { ...validated.data, userId: session.user.id },
    include: { _count: { select: { todos: true } } },
  });

  return category;
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validated = updateCategorySchema.safeParse(data);
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category || category.userId !== session.user.id) throw new Error("Not found");

  return prisma.category.update({
    where: { id },
    data: validated.data,
    include: { _count: { select: { todos: true } } },
  });
}

export async function deleteCategory(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category || category.userId !== session.user.id) throw new Error("Not found");

  await prisma.category.delete({ where: { id } });
  return { success: true };
}
