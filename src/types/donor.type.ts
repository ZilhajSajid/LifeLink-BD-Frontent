import { User } from "./user.type";

export interface DonorApplicationData {
  user: {
    name: string;
    email: string;
  };
  donor: {
    bloodGroup: string;
    address: string;
    gender: string;
    dateOfBirth: string;
    city: string;
  };
}

export interface DonorApplicationPayload {
  certificate: File;
  additionalFiles: File[];
  data: DonorApplicationData;
}

export type DonorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Donor {
  id: string;
  bloodGroup: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  isAvailable: boolean;
  lastDonationDate?: string | null;
  totalDonations: number;
  verificationStatus: DonorVerificationStatus;
  rejectionStatus?: string | null;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  certificate?: string | null;
  certificatePublicId: string;
  additionalFiles?: { url: string; publicId: string }[] | null;
  isDeleted: boolean;
  deletedAt?: null | string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface DonorParams {
  verificationStatus?: DonorVerificationStatus;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}

export interface ApproveDonorPayload {
  donorId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}
