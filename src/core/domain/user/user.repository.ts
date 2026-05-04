import { UserEntity } from '@/core/domain/user/user.entity';

export interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  checkTermo: boolean;
}

export interface UserRepository {
  create(data: CreateUserData): Promise<UserEntity>;
}
