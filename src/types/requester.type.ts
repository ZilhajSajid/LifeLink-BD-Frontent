export interface CreateBloodRequestResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    paymentUrl: string;
  };
}

export interface CreateBloodRequestPayload {
  bloodGroup: string;
  unitsRequired: number;
  urgency: string;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  requiredDate: string;
  reason?: string;
}
