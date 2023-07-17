export interface CreateOrderRequest {
  orderId: number;
}

export interface UpdateOrderRequest {
  orderId: number;
}
export interface OrderInstructionsRequest {
  id: number;
  orderInstructions: string;
}
