import apiClient from "@/lib/apiClient";
import { GooglePayload, LoginPayload, RegisterPayload, VerifyAccountPayload } from "@/types";

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}
export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}
export function getMe() {
  return apiClient("/users/me");
}

export function googleOAuth(payload: GooglePayload) {
  return apiClient("/auth/google", { method: "POST", body: payload });
}

export function userRegistration(payload: RegisterPayload) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export function verifyAccount(payload:VerifyAccountPayload){
  return apiClient("/auth/verify-email",{method:"POST",body:payload})
}