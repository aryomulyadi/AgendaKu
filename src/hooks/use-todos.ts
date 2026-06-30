"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodayTodos,
  getTodayStats,
  getFocusTask,
  getTomorrowTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
} from "@/lib/actions/todo";
import type { CreateTodoInput, UpdateTodoInput } from "@/lib/schemas/todo";

const keys = { all: ["todos"] as const };

export function useTodayTodos() {
  return useQuery({
    queryKey: [...keys.all, "today"],
    queryFn: () => getTodayTodos(),
  });
}

export function useTodayStats() {
  return useQuery({
    queryKey: [...keys.all, "stats"],
    queryFn: () => getTodayStats(),
  });
}

export function useFocusTask() {
  return useQuery({
    queryKey: [...keys.all, "focus"],
    queryFn: () => getFocusTask(),
  });
}

export function useTomorrowTodos() {
  return useQuery({
    queryKey: [...keys.all, "tomorrow"],
    queryFn: () => getTomorrowTodos(),
  });
}

export function useCreateTodo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTodoInput) => createTodo(data),
    onSuccess: () => client.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useToggleTodo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleTodo(id),
    onSuccess: () => client.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useUpdateTodo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoInput }) => updateTodo(id, data),
    onSuccess: () => client.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useDeleteTodo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => client.invalidateQueries({ queryKey: keys.all }),
  });
}

export function useSearchTodos(query: string) {
  return useQuery({
    queryKey: [...keys.all, "search", query],
    queryFn: () => searchTodos(query),
    enabled: query.length >= 2,
  });
}
