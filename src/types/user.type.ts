export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DONOR" | "REQUESTER";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export interface User {
  id: string;
  name: string;
  email: string;
  googleId: null | string;
  role: UserRole;
  authProvider: string;
  contactNumber: string;
  status: UserStatus;
  emailVerified: boolean;
  needPasswordChange: boolean;
  imageUrl: null | string;
  imagePublicId: null | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}
