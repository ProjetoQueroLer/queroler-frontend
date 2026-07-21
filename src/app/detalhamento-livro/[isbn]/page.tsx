import { getBookDetailsAction } from '@/app/actions/getBookDetails.actions';
import { BookDetails } from '@/presentation/pages/bookDetails/BookDetails';

interface RouteParams {
  params: Promise<{ isbn: string }>;
}

export default async function DetalhamentoLivroPage({ params }: RouteParams) {
  const { isbn } = await params;

  const response = await getBookDetailsAction(isbn);

  if (!response.success) {
    return <div>Erro!</div>;
  }

  return <BookDetails detalhesLivro={response.response} />;
}
