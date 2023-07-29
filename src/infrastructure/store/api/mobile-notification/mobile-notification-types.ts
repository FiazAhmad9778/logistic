export interface CreateMobileNotificationRequest {
  clientGroupId: number;
  clientId: number;
  title: string;
  type: string;
  message: string;
  description: string;
  isActive: boolean;
}
export interface UpdateMobileNotificationRequest extends CreateMobileNotificationRequest {
  id: number;
}

export interface MobileNotificationResponse {
  id: number;
  clientId: number;
  title: string;
  type: string;
  message: string;
  description: string;
  isActive: boolean;
  createdDate: string;
}
