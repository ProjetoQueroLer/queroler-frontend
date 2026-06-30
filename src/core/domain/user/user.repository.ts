import { UserEntity } from '@/core/domain/user/user.entity';

export interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  checkTermo: boolean;
}

export interface UpdateUserProfileData {
  nome: string;
  email: string;
  dataDeNascimento: string;
  cidade: string;
  estado: string;
  pais: string;
}

export interface UserRepository {
  create(data: CreateUserData): Promise<UserEntity>;
  delete(): Promise<void>;
  updateProfile(dados: string, imagem?: File): Promise<void>;
}
