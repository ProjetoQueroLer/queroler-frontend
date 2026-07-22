'use client';

import { Profile } from '@/core/domain/user/profile.enum';
import { Header } from '@/presentation/shared/components/header/header';
import { ReadingDiaryBookCard } from '@/presentation/shared/components/readingDiaryBookCard/ReadingDiaryBookCard';
import { useUserStore } from '@/presentation/shared/lib/user-store';

export function ReadingDiary() {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <Header
        nomeUsuario={user?.nome ?? ''}
        email={user?.email ?? ''}
        fotoDePerfil={user?.fotoUrl ?? 'Foto não encontrada.'}
        profile={user?.profile ?? Profile.LEITOR}
      />
      <div className="min-h-screen lg:mx-50 flex flex-col">
        <main className="flex-1 px-4 py-6 lg:px-8">
          <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
            Diário de Leitura - Minha Jornada
          </h1>
          <p className="text-text-secondary text-sm lg:text-base mb-8 lg:mb-6">
            Acompanhe as obras da sua jornada literária.
          </p>

          <div className="flex flex-col gap-5 md:gap-8">
            <ReadingDiaryBookCard
              title="O Morro dos Ventos Uivantes"
              author="Emily Bronte"
              cover="https://m.media-amazon.com/images/I/71lqmkoeosL.jpg"
              editora="Landmark LTDA"
              numeroPaginas={613}
              id={''}
            />
            <ReadingDiaryBookCard
              title="Título"
              author="Autores"
              cover=""
              editora="Nome da Editora"
              numeroPaginas={500}
              id={''}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
