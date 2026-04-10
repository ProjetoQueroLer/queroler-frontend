import {
  CreateUserData,
  UserRepository,
} from '@/core/domain/user/user.repository';
import { CreateUserDTO } from '@/core/application/user/create-user.dto';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<void> {
    const payload: CreateUserData = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      confirmarSenha: data.confirmarSenha,
      cpf: data.cpf,
      checkTermo: data.checkTermo,
    };

    await this.userRepository.create(payload);
  }
}
