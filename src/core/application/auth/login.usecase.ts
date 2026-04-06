import { LoginDTO } from '@/core/application/auth/login.dto';
import {
  AuthRepository,
  LoginResponse,
} from '@/core/domain/auth/auth.repository';

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponse> {
    return this.authRepository.login(data);
  }
}
