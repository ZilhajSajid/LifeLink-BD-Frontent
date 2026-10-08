import apiClient from "@/lib/apiClient";
import { DonorApplicationPayload, VerifyAccountPayload } from "@/types";

export function applyAsDonor(payload: DonorApplicationPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("certificate", payload.certificate);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/donors/apply-as-donor", {
    method: "POST",
    body: formData,
  });
}
export function verifyDonorAccount(payload: VerifyAccountPayload) {
  return apiClient("/donors/apply-as-donor/verify-email", {
    method: "POST",
    body: payload,
  });
}
