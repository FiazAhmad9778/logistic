export interface RoleResponse {
  id: number;
  name: string;
}

export interface RoleRequest {
  roleId: number;
  roleName: string;
  claims: number[];
}
export interface ClaimGroupRequest {
  roleId: number;
  roleClaims: RoleClaim[];
}

export interface RoleClaim {
  roleId: number;
  roleClaimId: number;
  isAssigned: boolean;
}

export interface ClaimGroupRequest {
  claims: Claim[];
  claimGroupName: string;
}

export interface Claim {
  claimCode: string;
  claimValue: string;
  isAssigned: boolean;
  claimId: number;
  roleId: number;
}
