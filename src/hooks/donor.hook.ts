import { applyAsDonor } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useApplyAsDonor() {
  return useMutation({
    mutationFn: applyAsDonor,
  });
}
