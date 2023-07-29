export interface CreateLateReasonRequest {
  clientGroupId: number;
  clientId: number;
  reason: string;
  isActive: boolean;
}
export interface UpdateLateReasonRequest extends CreateLateReasonRequest {
  id: number;
}

export interface LateReasonResponse {
  id: number;
  clientId: number;
  reason: string;
  isActive: boolean;
  createdDate: string;
}
