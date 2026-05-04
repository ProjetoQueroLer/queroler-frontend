import { IdiomaEnum } from '@/core/domain/book/language.enum';
import z from 'zod';

export const createBookSchema = z.object({
  titulo: z.string().min(1, 'Título obrigatório'),
  isbn: z
    .string()
    .min(1, 'ISBN obrigatório')
    .max(17, 'Máximo de 17 caracteres')
    .transform((val) => val.replace(/\D/g, '')),
  editora: z.string().min(1, 'Editora obrigatória'),
  anoDePublicacao: z
    .string('Ano de publicação obrigatório')
    .min(1, 'Ano de publicação deve ter no mínimo 1 dígito')
    .max(4, 'Ano de publicação deve ter 4 dígitos'),
  numeroDePaginas: z.string('Número de páginas obrigatório'),
  idioma: z.enum(IdiomaEnum),
  sinopse: z.string().min(50, 'Sinopse deve ter 50 caracteres no mínimo'),
  autores: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val.trim() !== '') {
        return val
          .split(',')
          .map((nome) => ({ nome: nome.trim() }))
          .filter((obj) => obj.nome !== '');
      }
      return val;
    },
    z.array(
      z.object({
        nome: z.string(),
      })
    )
  ),
});

export type CreateBookDTO = z.infer<typeof createBookSchema>;
