import z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail obrigatório')
    .max(256, 'Máximo de 256 caracteres')
    .email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .nonempty('Senha obrigatória'),
});

export type LoginDTO = z.infer<typeof loginSchema>;
