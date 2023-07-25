export interface CreateSafetyCheckRequest {
  clientGroupId: number;
  clientId: number;
  checkName: string;
  checkDescription: string;
  checkLogo: string;
  checkActive: boolean;
  fieldType: string;
  isMajorFault: boolean;
  defaultValue: boolean;
  isNumberOnly: boolean;
}
export interface UpdateSafetyCheckRequest extends CreateSafetyCheckRequest {
  id: number;
}

export interface SafetyCheckResponse {
  id: 0;
  checkName: 'string';
  checkDescription: 'string';
  checkLogo: 'string';
  checkActive: true;
  fieldType: 'string';
  isMajorFault: true;
  defaultValue: true;
  isNumberOnly: true;
}
