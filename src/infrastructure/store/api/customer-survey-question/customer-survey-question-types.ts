export interface CreateSurveyQuestionRequest {
  clientGroupId: number;
  clientId: number;
  question: string;
  isActive: boolean;
}
export interface UpdateSurveyQuestionRequest extends CreateSurveyQuestionRequest {
  id: number;
}

export interface SurveyQuestionResponse {
  id: number;
  clientId: number;
  question: string;
  fieldType: string;
  fieldTypeId: number;
  isActive: boolean;
  createdDate: string;
}
