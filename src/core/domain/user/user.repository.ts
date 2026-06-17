import { UserEntity } from '@/core/domain/user/user.entity';

export interface CreateUserData {
  nome: string;
  email: string;
  confirmarEmail: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  dataDeNascimento: string;
  checkTermo: boolean;
}

export interface ChangePasswordData {
  senhaAtual: string;
  senhaNova: string;
}

export interface UserRepository {
  create(data: string): Promise<UserEntity>;
  changePassword(data: ChangePasswordData): Promise<void>;
}
