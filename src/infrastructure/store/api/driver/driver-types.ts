export interface DriverResponse {
  id: number;
  name: string;
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
  firstName: string;
  lastName: string;
  phoneNumber: string;
  clientIds: string;
  address: string;
  isActive: boolean;
}
export interface MileageRequest {
  vehicleRegistrationNumber: number;
  mileage: string;
}
