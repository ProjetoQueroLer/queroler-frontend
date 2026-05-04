export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: unknown;
  setCookie?: string[];
}

export interface AuthRepository {
  login(data: LoginData): Promise<LoginResponse>;
}
