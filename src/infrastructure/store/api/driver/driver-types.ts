export interface DriverResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  driverId: string;
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
  clientIds: number[];
  address: string;
  isActive: boolean;
}
export interface MileageRequest {
  vehicleRegistrationNumber: number;
  mileage: string;
}

export interface SafetyCheckResponse {
  id: number;
  checkName: string;
  checkDescription: string;
  checkLogo: string;
  checkActive: boolean;
  fieldType: string;
  isMajorFault: boolean;
  defaultValue: boolean;
  isNumberOnly: number | null;
}
