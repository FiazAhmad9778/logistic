export interface AutomatedEmailRequest {
  id?: number;
  clientGroupId: number;
  clientId: number;
  email: string;
  sectionId: number;
}

export interface AutomatedEmailResponse {
  id: number;
  email: string;
  clientId: number;
  sectionId: number;
  sectionName: string;
  isActive: boolean;
  createdDate: string;
}
