import {
  applyAsDonor,
  approveDonor,
  getAllDonors,
  verifyDonorAccount,
} from "@/api";
import { DonorParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

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
export function useGetAllDonors(params: DonorParams) {
  return useQuery({
    queryKey: ["donors", params],
    queryFn: () => getAllDonors(params),
  });
}
export function useSuspenseGetAllDonors(params: DonorParams) {
  return useSuspenseQuery({
    queryKey: ["donors", params],
    queryFn: () => getAllDonors(params),
  });
}

export function useApproveDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveDonor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donors"] });
    },
  });
}
