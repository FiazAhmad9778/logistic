export interface CreateClientRequest {
  clientGroupId: number;
  clientName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface UpdateClientRequest {
  id: number;
  clientGroupId: number;
  clientName: string;
  address: string;
  isActive: boolean;
}

export interface ClientResponse {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
  createdDate: string;
}
