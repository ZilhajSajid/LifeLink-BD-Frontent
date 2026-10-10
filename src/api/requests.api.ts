import apiClient from "@/lib/apiClient";
import { CreateBloodRequestPayload, CreateDonationPayload } from "@/types";

export function getBloodRequests() {
  return apiClient("/requests/all-requests");
}
export function createDonation(payload:CreateDonationPayload) {
  return apiClient("/donations/create-donation",{method:"POST",body:payload});
}
export function createBloodRequest(payload:CreateBloodRequestPayload){
  return apiClient("/requests/create-requests",{method:"POST",body:payload})
}