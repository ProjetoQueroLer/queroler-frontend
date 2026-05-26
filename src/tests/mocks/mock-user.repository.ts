import { Profile } from '@/core/domain/user/profile.enum';
import { UserEntity } from '@/core/domain/user/user.entity';
import {
  ChangePasswordData,
  UserRepository,
} from '@/core/domain/user/user.repository';

export class MockUserRepository implements UserRepository {
  public async create(_data: string): Promise<UserEntity> {
    return {
      id: 19,
      nome: 'Teste',
      email: 'teste@email.com',
      cpf: '47583364758',
      profile: Profile.LEITOR,
      dataDeNascimento: '2000-12-30',
      aceitarTermos: true,
      cidade: 'Cidade',
      estado: 'Estado',
      pais: 'Pais',
      foto: null,
      user: undefined,
      notificacoes: undefined,
      livros: undefined,
    };
  }

  public async changePassword(_data: ChangePasswordData): Promise<void> {}
}
