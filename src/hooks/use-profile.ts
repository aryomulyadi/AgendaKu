"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/actions/settings";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    staleTime: 5 * 60 * 1000,
  });
}
