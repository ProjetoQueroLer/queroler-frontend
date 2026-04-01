import { Header } from '@/presentation/shared/components/header/header';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-text-secondary">Tela inicial</p>
      </main>
    </div>
  );
};
