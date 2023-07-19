export interface CreateRouteRequest {
  clientGroupId: number;
  clientId: number;
  routeName: string;
  routeStart: string;
  routeEnd: string;
  routeDate: string | Date;
  isMannualRoute: boolean;
}
export interface UpdateRouteRequest {
  clientGroupId: number;
  id: number;
  clientId: number;
  routeName: string;
  routeStart: string;
  routeEnd: string;
  routeDate: string | Date;
  isMannualRoute: boolean;
}
export interface RouteResponse {
  id: number;
  routeName: string;
  routeStart: string;
  routeDate: string | Date;
}