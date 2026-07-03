import { LoadUserProfileResponseDTO } from '@/core/application/user/load-user-profile-page-response.dto';
import { Profile } from '@/core/domain/user/profile.enum';
import { UserEntity } from '@/core/domain/user/user.entity';
import {
  ChangePasswordData,
  UserRepository,
} from '@/core/domain/user/user.repository';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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

  public async updateProfile(_dados: string, _imagem?: File): Promise<void> {
    return;
  }

  public async delete(): Promise<void> {
    return;
  }

  public async changePassword(_data: ChangePasswordData): Promise<void> {}

  public async carregarTelaDePerfilLeitura(): Promise<
    AxiosResponse<LoadUserProfileResponseDTO>
  > {
    return {
      data: {
        nome: 'Usuário Teste',
        email: 'usuario.teste@email.com',
        cpf: '47812775003',
        dataDeNascimento: '17/10/2005',
        cidade: null,
        estado: null,
        pais: null,
        fotoUrl: 'Foto não encontrada.',
        profile: Profile.LEITOR,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };
  }
}
