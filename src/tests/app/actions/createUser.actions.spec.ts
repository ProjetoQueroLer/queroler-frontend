import { createUserAction } from '@/app/actions/createUser.actions';
import { createUserPayload } from '@/tests/mocks/data-providers/create-user-action.data-provider';

const mockExecute = jest.fn();

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));
jest.mock('@/infra/http/api', () => ({}));
jest.mock('@/core/application/user/create-user.usecase', () => ({
  CreateUserUseCase: jest.fn().mockImplementation(() => ({
    execute: mockExecute,
  })),
}));

describe('Server Actions: createUserAction', () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  it('deve criar um usuário com sucesso', async () => {
    mockExecute.mockResolvedValue(undefined);
    const data = createUserPayload();
    const result = await createUserAction(data);
    expect(result.success).toBe(true);
    expect(result.message).toBe('User created successfully.');
  });

  it('deve validar os dados e retornar erros para dados inválidos', async () => {
    const data = createUserPayload({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      cpf: '',
    });
    const result = await createUserAction(data);
    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'Invalid data. Please check the form and try again.'
    );
    expect(result.errors).toBeDefined();
  });

  it('deve retornar um erro genérico quando a criação falhar', async () => {
    mockExecute.mockRejectedValue(new Error('UNKNOWN_ERROR'));
    const data = createUserPayload();
    const result = await createUserAction(data);
    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'Failed to create user. Please try again later.'
    );
  });
});
