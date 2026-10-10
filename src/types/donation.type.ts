export type DonationStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export interface Donation {
  id: string;
  units: number;
  scheduledAt: string;
  donatedAt?: null | string;
  status: DonationStatus;
  assignmentId: string;
  recordUrl?: null | string;
  recordPublicId?: null | string;
  createdAt: string;
  updatedAt: string;
  assignment: Assignment;
}
export interface Assignment {
  id: string;
  status: string;
  acceptedAt: string;
  completedAt?: null | string;
  bloodRequest: BloodRequest;
}

export interface BloodRequest {
  id: string;
  bloodGroup: string;
  unitsRequired: number;
  unitsFulfilled: number;
  urgency: string;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  requiredDate: string;
  status: string;
}

export interface CreateDonationPayload {
  bloodRequestId: string;
  units: number;
  scheduledAt: string;
}

export interface DonationParams {
  status?: DonationStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}
