export interface CreateRouteRequest {
  clientGroupId: number;
  clientId: number;
  routeName: string;
  routeStart: string;
  routeEnd: string;
  routeStartDate: Date | string;
  routeEndDate: Date | string | undefined;
}
export interface UpdateRouteRequest {
  clientGroupId: number;
  id: number;
  clientId: number;
  routeName: string;
  routeStart: string;
  routeEnd: string;
  routeStartDate: Date | string;
  routeEndDate: Date | string | undefined;
}
export interface RouteResponse {
  id: number;
  routeName: string;
  routeStart: string;
  routeEnd: string;
  routeStartDate: Date | string;
  routeEndDate: Date | string | undefined;
  driverId: number;
  driverName: string;
}

export interface CreateRouteDriverAssignmentRequest {
  driverId: number;
  routeIds: number[];
}
