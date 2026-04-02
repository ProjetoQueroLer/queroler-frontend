import { Header } from '@/presentation/shared/components/header/header';
import { SearchBar } from '@/presentation/shared/components/search-bar/search-bar';

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
      </main>
    </div>
  );
};
