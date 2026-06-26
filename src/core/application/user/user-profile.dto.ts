import z from 'zod';

export const userProfileSchema = z.object({
  nome: z.string(),
  email: z.string(),
  cpf: z.string(),
  dataDeNascimento: z.string(),
  cidade: z.string(),
  estado: z.string(),
  pais: z.string(),
  fotoUrl: z.string().nullable().optional(),
  imagem: z.any().optional(),
});

export type UserProfileFormDTO = z.input<typeof userProfileSchema>;
export type UserProfileRequestDTO = z.infer<typeof userProfileSchema>;
