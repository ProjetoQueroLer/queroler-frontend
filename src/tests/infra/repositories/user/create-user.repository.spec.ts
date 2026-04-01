import { ApiUserRepository } from '@/infra/repositories/user/create-user.repository';
import { CreateUserDTO } from '@/core/application/user/create-user.dto';
import { UserEntity } from '@/core/domain/user/user.entity';
import { AxiosInstance } from 'axios';
import { Profile } from '@/core/domain/user/profile.enum';

describe('ApiUserRepository', () => {
  let api: jest.Mocked<AxiosInstance>;
  let repository: ApiUserRepository;

  const userPayload: CreateUserDTO = {
    nome: 'Teste',
    email: 'teste@email.com',
    senha: '123456',
    confirmarSenha: '123456',
    cpf: '429.063.400-14',
    checkTermo: true,
  };

  const userResponse: UserEntity = {
    id: 19,
    nome: 'Teste',
    email: 'teste@email.com',
    cpf: '429.063.400-14',
    profile: Profile.LEITOR,
    dataDeNascimento: null,
    aceitarTermos: true,
    cidade: null,
    estado: null,
    pais: null,
    foto: null,
    user: undefined,
    notificacoes: undefined,
    livros: undefined,
  };

  beforeEach(() => {
    api = {
      post: jest.fn(),
    } as never as jest.Mocked<AxiosInstance>;
    repository = new ApiUserRepository(api as unknown as AxiosInstance);
  });

  it('deve chamar api.post com os dados corretos e retornar o usuário', async () => {
    api.post.mockResolvedValue({ data: userResponse });
    const result = await repository.create(userPayload);
    expect(api.post).toHaveBeenCalledWith('/usuarios', userPayload);
    expect(result).toEqual(userResponse);
  });

  it('deve lançar o erro do backend se api.post falhar', async () => {
    const backendError = { response: { data: { message: 'Erro do backend' } } };
    api.post.mockRejectedValue(backendError);
    await expect(repository.create(userPayload)).rejects.toEqual({
      message: 'Erro do backend',
    });
  });

  it('deve lançar o próprio erro se não houver response.data', async () => {
    const genericError = new Error('Falha desconhecida');
    api.post.mockRejectedValue(genericError);
    await expect(repository.create(userPayload)).rejects.toEqual(genericError);
  });
});
