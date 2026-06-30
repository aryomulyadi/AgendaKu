"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { createTodoSchema, type CreateTodoInput } from "@/lib/schemas/todo";

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

function mapTodo(t: {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
  createdAt: Date;
  userId: string;
}) {
  return {
    id: t.id,
    title: t.title,
    done: t.completed,
    priority: (t.priority === "HIGH" ? 3 : t.priority === "MEDIUM" ? 2 : 1) as 1 | 2 | 3,
  };
}

export async function getTodayTodos() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const { start, end } = getTodayRange();

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      OR: [
        { deadline: { gte: start, lte: end } },
        { deadline: null, createdAt: { gte: start } },
      ],
    },
    orderBy: [
      { completed: "asc" },
      { priority: "desc" },
      { createdAt: "desc" },
    ],
  });

  return todos.map(mapTodo);
}

export async function getTodayStats() {
  const session = await auth();
  if (!session?.user?.id) return { total: 0, completed: 0 };

  const { start, end } = getTodayRange();

  const all = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      OR: [
        { deadline: { gte: start, lte: end } },
        { deadline: null, createdAt: { gte: start } },
      ],
    },
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
    where: {
      userId: session.user.id,
      completed: false,
      OR: [
        { deadline: { gte: start, lte: end } },
        { deadline: null, createdAt: { gte: start } },
      ],
    },
    orderBy: { priority: "desc" },
  });

  if (!task) return null;
  return mapTodo(task);
}

export async function getTomorrowTodos() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const { start, end } = getTomorrowRange();

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
      deadline: { gte: start, lte: end },
    },
    orderBy: { priority: "desc" },
    take: 3,
  });

  return todos.map((t) => ({
    id: t.id,
    title: t.title,
    done: t.completed,
  }));
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
    },
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
