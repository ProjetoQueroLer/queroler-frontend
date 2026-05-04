export interface CreateBookData {
  titulo: string;
  isbn: string;
  editora: string;
  anoDePublicacao: string;
  numeroDePaginas: string;
  idioma: string;
  sinopse: string;
  autores: { nome: string }[];
}

export interface BookRepository {
  create(dados: string, imagem?: string): Promise<void>;
}
