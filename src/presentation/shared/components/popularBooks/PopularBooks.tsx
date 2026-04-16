'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { BookCard } from '@/presentation/shared/components/bookCard/BookCard';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';

interface Livro {
  id: string;
  titulo: string;
  autores: { nome: string }[];
  capaUrl: string;
}

interface RespostaBack {
  content: Livro[];
  totalElements: number;
}

export function PopularBooks() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [total, setTotal] = useState(0);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarPopulares() {
      try {
        const resposta = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/livros/populares`
        );

        if (!resposta.ok) return;

        const dados: RespostaBack = await resposta.json();
        setLivros(dados.content);
        setTotal(dados.totalElements);
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro('Erro inesperado.');
        }
      }
    }

    buscarPopulares();
  }, []);

  return (
    <div className="bg-card-bg border border-border rounded-xl px-4 py-3 lg:p-6 lg:py-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star size={18} className="text-brand" />
          <span className="text-text-primary text-sm lg:text-base font-semibold">
            Livros populares
          </span>
        </div>

        <span className=" flex items-center gap-1 text-xs font-thin px-2 py-1 rounded-xs">
          {total} livros
        </span>
      </div>

      <FieldError message={erro} />

      <div className="flex gap-4 overflow-x-auto pb-2">
        {livros.map((livro) => (
          <BookCard
            key={livro.id}
            id={livro.id}
            title={livro.titulo}
            author={livro.autores?.[0]?.nome || ''}
            cover={livro.capaUrl || ''}
          />
        ))}
      </div>
    </div>
  );
}
