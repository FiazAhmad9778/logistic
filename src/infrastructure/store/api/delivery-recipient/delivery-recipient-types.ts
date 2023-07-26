export interface DeliveryRecipientRequest {
  id?: number;
  clientGroupId: number;
  clientId: number;
  name: string;
}

export interface DeliveryRecipientResponse {
  id: number;
  name: string;
  clientId: number;
  isActive: boolean;
  createdDate: string;
}
