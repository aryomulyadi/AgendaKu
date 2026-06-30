"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  createTodoSchema,
  updateTodoSchema,
  type CreateTodoInput,
  type UpdateTodoInput,
} from "@/lib/schemas/todo";

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function getTomorrowRange() {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setDate(end.getDate() + 1);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

type RawTodo = {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
  deadline: Date | null;
  createdAt: Date;
  userId: string;
  categoryId: string | null;
  category?: { id: string; name: string; color: string } | null;
};

function mapTodo(t: RawTodo) {
  return {
    id: t.id,
    title: t.title,
    done: t.completed,
    priority: (t.priority === "HIGH" ? 3 : t.priority === "MEDIUM" ? 2 : 1) as 1 | 2 | 3,
    deadline: t.deadline?.toISOString() ?? null,
    categoryId: t.categoryId,
    categoryName: t.category?.name ?? null,
    categoryColor: t.category?.color ?? null,
  };
}

const todayOrNoDeadline = (start: Date, end: Date) => [
  { deadline: { gte: start, lte: end } },
  { deadline: null, createdAt: { gte: start } },
];

export async function getTodayTodos() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const { start, end } = getTodayRange();

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id, OR: todayOrNoDeadline(start, end) },
    include: { category: { select: { id: true, name: true, color: true } } },
    orderBy: [
      { completed: "asc" },
      { priority: "desc" },
      { createdAt: "desc" },
    ],
  });

  return todos.map(mapTodo);
}

export async function getCalendarTasks(year: number, month: number) {
  const session = await auth();
  if (!session?.user?.id) return [];

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id, OR: [{ deadline: { gte: start, lte: end } }, { createdAt: { gte: start, lte: end } }] },
    select: { deadline: true, createdAt: true },
  });

  const counts: Record<string, number> = {};
  for (const t of todos) {
    const date = t.deadline
      ? `${t.deadline.getFullYear()}-${String(t.deadline.getMonth() + 1).padStart(2, "0")}-${String(t.deadline.getDate()).padStart(2, "0")}`
      : `${t.createdAt.getFullYear()}-${String(t.createdAt.getMonth() + 1).padStart(2, "0")}-${String(t.createdAt.getDate()).padStart(2, "0")}`;
    counts[date] = (counts[date] ?? 0) + 1;
  }

  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}
export async function getTodayStats() {
  const session = await auth();
  if (!session?.user?.id) return { total: 0, completed: 0 };

  const { start, end } = getTodayRange();

  const all = await prisma.todo.findMany({
    where: { userId: session.user.id, OR: todayOrNoDeadline(start, end) },
    select: { completed: true },
  });

  return {
    total: all.length,
    completed: all.filter((t) => t.completed).length,
  };
}

export async function getFocusTask() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const { start, end } = getTodayRange();

  const task = await prisma.todo.findFirst({
    where: { userId: session.user.id, completed: false, OR: todayOrNoDeadline(start, end) },
    include: { category: { select: { id: true, name: true, color: true } } },
    orderBy: { priority: "desc" },
  });

  if (!task) return null;
  return mapTodo(task);
}

export async function getTomorrowTodos() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const { start, end } = getTomorrowRange();

  const deadlineTasks = await prisma.todo.findMany({
    where: { userId: session.user.id, deadline: { gte: start, lte: end } },
    orderBy: { priority: "desc" },
    take: 3,
  });

  const { start: todayStart } = getTodayRange();
  const carryOver = await prisma.todo.findMany({
    where: { userId: session.user.id, completed: false, deadline: null, createdAt: { gte: todayStart } },
    orderBy: { priority: "desc" },
    take: 2,
  });

  const mapped = deadlineTasks.map((t) => ({ id: t.id, title: t.title, done: t.completed, carryOver: false as const }));
  const mappedCarry = carryOver.map((t) => ({ id: t.id, title: t.title, done: t.completed, carryOver: true as const }));

  return [...mapped, ...mappedCarry].slice(0, 5);
}

export async function createTodo(data: CreateTodoInput) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validated = createTodoSchema.safeParse(data);
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const todo = await prisma.todo.create({
    data: {
      title: validated.data.title,
      priority: validated.data.priority,
      userId: session.user.id,
      ...(validated.data.categoryId ? { categoryId: validated.data.categoryId } : {}),
      ...(validated.data.deadline ? { deadline: new Date(validated.data.deadline) } : {}),
    },
    include: { category: { select: { id: true, name: true, color: true } } },
  });

  return mapTodo(todo);
}

export async function toggleTodo(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.user.id) throw new Error("Not found");

  const updated = await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
    include: { category: { select: { id: true, name: true, color: true } } },
  });

  return mapTodo(updated);
}

export async function updateTodo(id: string, data: UpdateTodoInput) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validated = updateTodoSchema.safeParse(data);
  if (!validated.success) throw new Error(validated.error.issues[0].message);

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.user.id) throw new Error("Not found");

  const updateData: Record<string, unknown> = {};
  if (validated.data.title !== undefined) updateData.title = validated.data.title;
  if (validated.data.priority !== undefined) updateData.priority = validated.data.priority;
  if (validated.data.deadline !== undefined) {
    updateData.deadline = validated.data.deadline ? new Date(validated.data.deadline) : null;
  }
  if (validated.data.categoryId !== undefined) updateData.categoryId = validated.data.categoryId;

  const updated = await prisma.todo.update({
    where: { id },
    data: updateData,
    include: { category: { select: { id: true, name: true, color: true } } },
  });

  return mapTodo(updated);
}

export async function deleteTodo(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.user.id) throw new Error("Not found");

  await prisma.todo.delete({ where: { id } });
  return { success: true };
}

export async function getDateTodos(dateStr: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  const [year, month, day] = dateStr.split("-").map(Number);
  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  const end = new Date(year, month - 1, day, 23, 59, 59, 999);

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      OR: [
        { deadline: { gte: start, lte: end } },
        { deadline: null, createdAt: { gte: start, lte: end } },
      ],
    },
    include: { category: { select: { id: true, name: true, color: true } } },
    orderBy: [{ completed: "asc" }, { priority: "desc" }, { createdAt: "desc" }],
  });

  return todos.map(mapTodo);
}

export async function searchTodos(query: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      title: { contains: query },
    },
    include: { category: { select: { id: true, name: true, color: true } } },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return todos.map(mapTodo);
}
