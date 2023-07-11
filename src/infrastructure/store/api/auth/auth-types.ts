export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
  userId: number;
}
export interface ForgotPasswordRequest {
  email: string;
  host: string;
}
export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyTokenRequest {
  token: string;
}
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
