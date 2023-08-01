export interface CreateCustomerRequest {
  clientGroupId: number;
  clientName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  isActive: string;
}

export interface UpdateCustomerRequest extends CreateCustomerRequest {
  id: number;
}

export interface CustomerResponse {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  isActive: boolean;
  createdDate: string;
}
