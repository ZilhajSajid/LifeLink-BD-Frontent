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
