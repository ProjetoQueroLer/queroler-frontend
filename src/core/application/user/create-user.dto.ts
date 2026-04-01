import z from 'zod';

export const createUserSchema = z
  .object({
    nome: z.string().min(1, 'Nome obrigatório'),
    email: z
      .string()
      .min(1, 'E-mail obrigatório')
      .max(256, 'Máximo de 256 caracteres')
      .email({ message: 'E-mail inválido' }),
    senha: z
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .nonempty('Senha obrigatória'),
    confirmarSenha: z.string().min(6, 'Confirmação obrigatória'),
    cpf: z.string().min(11, 'CPF obrigatório').max(14, 'CPF inválido'),
    checkTermo: z.literal(true, { message: 'É necessário aceitar os termos' }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export type CreateUserDTO = z.infer<typeof createUserSchema>;
