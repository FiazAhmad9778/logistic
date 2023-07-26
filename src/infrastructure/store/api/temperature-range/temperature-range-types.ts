export interface TemperatureRangeRequest {
  id?: number;
  clientGroupId: number;
  clientId: number;
  name: string;
  min: number;
  max: number;
}

export interface TemperatureRangeResponse {
  id: number;
  name: string;
  min: number;
  max: number;
  clientId: number;
  isActive: boolean;
  createdDate: string;
}
