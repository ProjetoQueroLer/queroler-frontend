import { LoginDTO } from '@/core/application/auth/login.dto';

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: unknown;
  setCookie?: string[];
}

export interface AuthRepository {
  login(data: LoginDTO): Promise<LoginResponse>;
}
