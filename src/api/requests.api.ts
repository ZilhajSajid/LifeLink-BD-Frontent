import apiClient from "@/lib/apiClient";
import { CreateDonationPayload } from "@/types";

export function getBloodRequests() {
  return apiClient("/requests/all-requests");
}
export function createDonation(payload:CreateDonationPayload) {
  return apiClient("/donations/create-donation",{method:"POST",body:payload});
}
