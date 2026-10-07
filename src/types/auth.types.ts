export interface LoginPayload {
  email: string;
  password: string;
}

export interface GooglePayload {
  idToken: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  requester: { contactNumber?: string };
}
