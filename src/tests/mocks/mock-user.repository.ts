import { CreateUserDTO } from '@/core/application/user/create-user.dto';
import { Profile } from '@/core/domain/user/profile.enum';
import { UserEntity } from '@/core/domain/user/user.entity';
import { UserRepository } from '@/core/domain/user/user.repository';

export class MockUserRepository implements UserRepository {
  public async create(data: CreateUserDTO): Promise<UserEntity> {
    return {
      id: 19,
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      profile: Profile.LEITOR,
      dataDeNascimento: '',
      aceitarTermos: data.checkTermo,
      cidade: '',
      estado: '',
      pais: '',
      foto: null,
      user: undefined,
      notificacoes: undefined,
      livros: undefined,
    };
  }
}
