export interface CreateClientGroupRequest {
  clientGroupName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateClientGroupRequest {
  id: number;
  clientGroupName: string;
}

export interface ClientGroupResponse {
  id: number;
  name: string;
  adminName: string;
  adminEmail: string;
  isActive: boolean;
  createdDate: string;
}
