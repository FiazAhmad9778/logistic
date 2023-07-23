export interface CreateOrderRouteAssignmentRequest {
  clientGroupId: number;
  clientId: number;
  orderIds: number[];
  routeId: number;
}
