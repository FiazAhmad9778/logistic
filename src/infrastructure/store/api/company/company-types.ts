export interface CreateUserRequest {
  clientGroupId: number;
  clientName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface UpdateUserRequest {
  id: number;
  clientGroupId: number;
  clientName: string;
  address: string;
  isActive: boolean;
}

export interface UserResponse {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
  createdDate: string;
}
