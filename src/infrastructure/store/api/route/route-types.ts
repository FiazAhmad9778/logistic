export interface CreateRouteRequest {
  routeId?: number;
  routeName: string;
  routeStart: string;
}

export interface RouteResponse {
  id: number;
  routeName: string;
  routeStart: string;
}
