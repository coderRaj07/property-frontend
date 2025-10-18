"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProperties = (filters: any, page: number) => {
  const queryKey = ["properties", filters, page] as const;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams(
        Object.entries(filters)
          .filter(([_, v]) => v !== "" && v != null)
          .map(([k, v]) => [k, String(v)])
      );
      params.set("page", String(page));

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const { data } = await axios.get(
        `${baseUrl}/get-properties?${params.toString()}`
      );

      return data;
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    enabled: Object.keys(filters).length > 0, // only fetch after Apply
  });
};
