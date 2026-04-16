'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/presentation/shared/components/header/header';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';
import Image from 'next/image';

export function BookRegister() {
  const router = useRouter();
  const [isbn, setIsbn] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    editora: '',
    ano: '',
    paginas: '',
    capa: '',
  });
  const podeSalvar = sinopse.length >= 50 && !!livro.titulo;

  async function buscarIsbn(valor: string) {
    if (valor.length < 10) return;

    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/livros/buscar/${valor}`
      );

      if (!resposta.ok) {
        setErro('Não há nenhum livro cadastrado com esse ISBN.');
        setLivro({
          titulo: '',
          autor: '',
          editora: '',
          ano: '',
          paginas: '',
          capa: '',
        });
        return;
      }

      const dados = await resposta.json();
      setLivro({
        titulo: dados.titulo || '',
        autor: dados.autores?.[0]?.nome || '',
        editora: dados.editora || '',
        ano: dados.anoDePublicacao || '',
        paginas: dados.numeroDePaginas?.toString() || '',
        capa: dados.capaUrl || '',
      });
    } catch {
      setErro('Erro ao buscar o livro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
          Incremente a nossa Biblioteca
        </h1>
        <p className="text-text-subtitle text-sm lg:text-base mb-6">
          Cadastre um livro não encontrado para você e outros leitores o
          adicionarem na sua lista de leitura.
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-3 w-full lg:w-[220px]">
            <span className="text-brand text-xs uppercase tracking-widest">
              Capa do livro
            </span>
            <div className="w-[100px] h-[140px] lg:w-[200px] lg:h-[280px] bg-border-default border-2 border-dashed border-border rounded-xs flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-80">
              {livro.capa ? (
                <Image
                  src={livro.capa}
                  alt="Capa do livro"
                  className="w-full h-full object-cover rounded-xs"
                />
              ) : (
                <>
                  <span className="text-text-secondary text-xs text-center px-4">
                    JPG, PNG ou JPEG
                  </span>
                  <span className="text-text-secondary text-xs text-center px-4">
                    Tamanho máximo 10MB
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-text-secondary text-xs uppercase tracking-widest">
                ISBN <span className="text-red-400">*</span>
              </label>
              <input
                data-testid="input-isbn"
                type="text"
                inputMode="numeric"
                placeholder="Ex: 978-3-16-148410-0"
                value={isbn}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, '');
                  setIsbn(valor);
                  buscarIsbn(valor);
                }}
                className="bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary"
              />
              <FieldError message={erro} />

              {carregando && (
                <span className="text-text-secondary text-xs mt-1">
                  Buscando livro...
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-text-secondary text-xs uppercase tracking-widest">
                Título do livro
              </label>
              <input
                data-testid="input-titulo"
                type="text"
                disabled
                value={livro.titulo}
                className="bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Autor(es)
                </label>
                <input
                  data-testid="input-autor"
                  type="text"
                  disabled
                  value={livro.autor}
                  className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 cursor-not-allowed"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Editora
                </label>
                <input
                  data-testid="input-editora"
                  type="text"
                  disabled
                  value={livro.editora}
                  className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Ano de Publicação
                </label>
                <input
                  data-testid="input-ano"
                  type="text"
                  disabled
                  value={livro.ano}
                  className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 cursor-not-allowed"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Número de Páginas
                </label>
                <input
                  data-testid="input-paginas"
                  type="text"
                  disabled
                  value={livro.paginas}
                  className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none opacity-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="text-text-secondary text-xs uppercase tracking-widest">
                Idioma <span className="text-red-400">*</span>
              </label>
              <select
                data-testid="select-idioma"
                className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none cursor-pointer"
              >
                <option value="">Selecione um idioma</option>
                <option value="pt-br">Português</option>
                <option value="en">Inglês</option>
                <option value="es">Espanhol</option>
              </select>
            </div>

            <div>
              <label className="text-text-secondary text-xs uppercase tracking-widest">
                Sinopse <span className="text-red-400">*</span>
              </label>
              <textarea
                data-testid="input-sinopse"
                placeholder="Escreva a sinopse do livro (mínimo 50 caracteres)..."
                rows={4}
                value={sinopse}
                onChange={(e) => setSinopse(e.target.value)}
                className="bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary w-full resize-none"
              />
              {sinopse.length < 50 && (
                <span className="text-xs mt-1 text-text-secondary">
                  {sinopse.length}/50 caracteres
                </span>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-2">
              <button
                data-testid="btn-cancelar"
                onClick={() => router.back()}
                className="px-6 py-3 text-sm text-text-secondary hover:opacity-80 cursor-pointer uppercase font-bold"
              >
                Cancelar
              </button>
              <button
                data-testid="btn-salvar"
                disabled={!podeSalvar}
                className={`px-6 py-3 text-sm rounded-lg uppercase font-bold transition-opacity duration-200 bg-brand text-white
                  ${!podeSalvar ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 cursor-pointer'}`}
              >
                Salvar dados
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
