import { LoginDTO } from '@/core/application/auth/login.dto';
import {
  AuthRepository,
  LoginResponse,
} from '@/core/domain/auth/auth.repository';
import { AxiosInstance } from 'axios';

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly api: AxiosInstance) {}

  async login(data: LoginDTO): Promise<LoginResponse> {
    try {
      const payload = {
        user: data.email,
        senha: data.password,
      };
      const response = await this.api.post('/logins', payload);

      const setCookieHeader = response.headers?.['set-cookie'];
      const setCookie = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : setCookieHeader
          ? [setCookieHeader]
          : [];

      const responseData =
        response.data && typeof response.data === 'object'
          ? (response.data as Record<string, unknown>)
          : {};

      // Verifica se a resposta tem erro mesmo com status 200
      if (
        responseData.message &&
        !responseData.accessToken &&
        !setCookie.some((cookie) => cookie.startsWith('jwt='))
      ) {
        throw new Error(String(responseData.message));
      }

      return {
        ...(responseData as LoginResponse),
        setCookie,
      };
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
