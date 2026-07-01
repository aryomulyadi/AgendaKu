"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodayTodos,
  getTodayStats,
  getTomorrowTodos,
  getBesokTodos,
  getCalendarTasks,
  getDateTodos,
  getAllTodos,
  getCompletedTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
} from "@/lib/actions/todo";
import type { CreateTodoInput, UpdateTodoInput } from "@/lib/schemas/todo";

const keys = {
  all: ["todos"] as const,
  today: () => ["todos", "today"] as const,
  stats: () => ["todos", "stats"] as const,
  tomorrow: () => ["todos", "tomorrow"] as const,
  calendar: (y: number, m: number) => ["todos", "calendar", y, m] as const,
  date: (d: string | null) => ["todos", "date", d] as const,
  allTodos: () => ["todos", "all"] as const,
  completed: () => ["todos", "completed"] as const,
  search: (q: string) => ["todos", "search", q] as const,
};

export function useTodayTodos() {
  return useQuery({
    queryKey: keys.today(),
    queryFn: () => getTodayTodos(),
  });
}

export function useTodayStats() {
  return useQuery({
    queryKey: keys.stats(),
    queryFn: () => getTodayStats(),
  });
}

export function useTomorrowTodos() {
  return useQuery({
    queryKey: keys.tomorrow(),
    queryFn: () => getTomorrowTodos(),
  });
}

export function useBesokTodos() {
  return useQuery({
    queryKey: ["todos", "besok"],
    queryFn: () => getBesokTodos(),
  });
}

export function useCalendarTasks(year: number, month: number) {
  return useQuery({
    queryKey: keys.calendar(year, month),
    queryFn: () => getCalendarTasks(year, month),
  });
}

export function useDateTodos(dateStr: string | null) {
  return useQuery({
    queryKey: keys.date(dateStr),
    queryFn: () => getDateTodos(dateStr!),
    enabled: !!dateStr,
  });
}

export function useCreateTodo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTodoInput) => createTodo(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos", "today"] });
      client.invalidateQueries({ queryKey: ["todos", "stats"] });
      client.invalidateQueries({ queryKey: ["todos", "tomorrow"] });
      client.invalidateQueries({ queryKey: ["todos", "besok"] });
      client.invalidateQueries({ queryKey: ["todos", "all"] });
      client.invalidateQueries({ queryKey: ["todos", "calendar"] });
      client.invalidateQueries({ queryKey: ["todos", "date"] });
      client.invalidateQueries({ queryKey: ["todos", "completed"] });
    },
  });
}

export function useToggleTodo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleTodo(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos", "today"] });
      client.invalidateQueries({ queryKey: ["todos", "stats"] });
      client.invalidateQueries({ queryKey: ["todos", "tomorrow"] });
      client.invalidateQueries({ queryKey: ["todos", "besok"] });
      client.invalidateQueries({ queryKey: ["todos", "all"] });
      client.invalidateQueries({ queryKey: ["todos", "completed"] });
      client.invalidateQueries({ queryKey: ["todos", "date"] });
      client.invalidateQueries({ queryKey: ["todos", "calendar"] });
    },
  });
}

export function useUpdateTodo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoInput }) => updateTodo(id, data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos", "today"] });
      client.invalidateQueries({ queryKey: ["todos", "stats"] });
      client.invalidateQueries({ queryKey: ["todos", "tomorrow"] });
      client.invalidateQueries({ queryKey: ["todos", "besok"] });
      client.invalidateQueries({ queryKey: ["todos", "all"] });
      client.invalidateQueries({ queryKey: ["todos", "calendar"] });
      client.invalidateQueries({ queryKey: ["todos", "date"] });
      client.invalidateQueries({ queryKey: ["todos", "completed"] });
    },
  });
}

export function useDeleteTodo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => client.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useAllTodos() {
  return useQuery({
    queryKey: keys.allTodos(),
    queryFn: () => getAllTodos(),
  });
}

export function useCompletedTodos() {
  return useQuery({
    queryKey: keys.completed(),
    queryFn: () => getCompletedTodos(),
  });
}

export function useSearchTodos(query: string) {
  return useQuery({
    queryKey: keys.search(query),
    queryFn: () => searchTodos(query),
    enabled: query.length >= 2,
  });
}
