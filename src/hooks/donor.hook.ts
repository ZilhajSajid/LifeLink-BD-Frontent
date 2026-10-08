import { applyAsDonor, verifyDonorAccount } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useApplyAsDonor() {
  return useMutation({
    mutationFn: applyAsDonor,
  });
}
export function useVerifyDonor() {
  return useMutation({
    mutationFn: verifyDonorAccount,
  });
}
