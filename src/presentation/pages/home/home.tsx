import { SearchBar } from '@/presentation/shared/components/searchBar/SearchBar';
import { BookOpen, BookMarked, CheckCircle, MinusCircle } from 'lucide-react';
import { BookSection } from '@/presentation/shared/components/bookSection/BookSection';
import { Header } from '@/presentation/shared/components/header/header';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
          Leituras atuais, desejadas e passadas
        </h1>
        <p className="text-text-subtitle text-sm lg:text-base mb-6">
          Organize sua jornada literária e acompanhe seu progresso.
        </p>
        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BookSection
            title="Livros que Quero Ler"
            tag="DESEJOS"
            tagColor="bg-desired/15 text-desired"
            icon={<BookMarked size={18} className="text-desired" />}
          />
          <BookSection
            title="Livros que estou lendo"
            tag="ATIVO"
            tagColor="bg-active/15 text-active"
            icon={<BookOpen size={18} className="text-active" />}
          />
          <BookSection
            title="Livros lidos"
            tag="CONCLUÍDO"
            tagColor="bg-completed/15 text-completed"
            icon={<CheckCircle size={18} className="text-completed" />}
          />
          <BookSection
            title="Livros abandonados"
            tag="PAUSA"
            tagColor="bg-pause/15 text-pause"
            icon={<MinusCircle size={18} className="text-pause" />}
          />
        </div>
      </main>
    </div>
  );
};
