export interface LoginPayload {
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
export interface ForgotPasswordPayload {
  email: string;
  host: string;
}
export interface ResetPasswordPayload {
  token: string;
  password: string;
}
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
