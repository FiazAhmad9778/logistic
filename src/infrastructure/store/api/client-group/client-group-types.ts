export interface CreateClientGroupRequest {
  clientGroupName: string;
  clientName: string;
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
  isActive: boolean;
  createdDate: string;
}
