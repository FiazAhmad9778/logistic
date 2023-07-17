export interface CreateRouteAssignmentRequest {
  routeId?: number;
  routeName: string;
  routeStart: string;
}

export interface RouteAssignmentResponse {
  id: number;
  routeName: string;
  routeStart: string;
}
