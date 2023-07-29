export interface CreateOrderQuestionRequest {
  clientGroupId: number;
  clientId: number;
  question: string;
  description: string;
  questionTypeId: number;
  orderTypeId: number;
  isActive: boolean;
}

export interface UpdateOrderQuestionRequest extends CreateOrderQuestionRequest {
  id: number;
}

export interface OrderQuestionResponse {
  id: number;
  clientId: number;
  question: string;
  description: string;
  questionType: string;
  orderType: string;
  isActive: boolean;
  createdDate: string;
}
