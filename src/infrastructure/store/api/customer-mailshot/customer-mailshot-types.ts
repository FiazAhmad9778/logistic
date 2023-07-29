export interface CreateCustomerMailshotRequest {
  clientGroupId: number;
  clientId: number;
  subject: string;
  body: string;
  isActive: boolean;
}
export interface UpdateCustomerMailshotRequest extends CreateCustomerMailshotRequest {
  id: number;
}

export interface CustomerMailshotResponse {
  id: number;
  clientId: number;
  subject: string;
  body: string;
  isActive: boolean;
  createdDate: string;
}
