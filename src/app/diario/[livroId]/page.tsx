import { ReadingDiaryForm } from '@/presentation/pages/readingDiaryForm/ReadingDiaryForm';

export default async function DiarioPage({
  params,
}: {
  params: Promise<{ livroId: string }>;
}) {
  const { livroId } = await params;
  return (
    <ReadingDiaryForm
      livroId={livroId}
      title="Titulo"
      author="Autores"
      editora="Editora Landmark LTDA"
      anoPublicacao={2012}
      numeroPaginas={613}
      idioma="Português"
      isbn={9788580700046}
    />
  );
}
