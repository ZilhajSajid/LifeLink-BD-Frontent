import { createDonation } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useCreateDonation() {
  return useMutation({
    mutationFn: createDonation,
  });
}
