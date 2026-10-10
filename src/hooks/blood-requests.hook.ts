import { getBloodRequests } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetBloodRequests() {
  return useQuery({
    queryKey: ["requests"],
    queryFn: getBloodRequests,
  });
}
