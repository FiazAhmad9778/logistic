export interface DriverResponse {
  id: number;
  address: string;
  isActive: boolean;
  createdDate: string;
}

export interface CreateDriverRequest {
  clientGroupId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  driverId: string;
}

export interface UpdateDriverRequest {
  clientGroupId: number;
  id: number;
  address: string;
  isActive: boolean;
}
