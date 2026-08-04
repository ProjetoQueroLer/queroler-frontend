'use client';

import { Profile } from '@/core/domain/user/profile.enum';
import { Input } from '@/presentation/shared/components';
import { DeleteDiaryModal } from '@/presentation/shared/components/deleteDiaryModal/DeleteDiaryModal';
import { Header } from '@/presentation/shared/components/header/header';
import { useUserStore } from '@/presentation/shared/lib/user-store';
import {
  BookHeart,
  Check,
  ChevronDown,
  NotebookPen,
  Plus,
  Star,
  Trash,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface ReadingDiaryFormProps {
  livroId?: string;
  title?: string;
  author?: string;
  cover?: string;
  editora?: string;
  numeroPaginas?: number | string;
  anoPublicacao?: number | string;
  idioma?: string;
  isbn?: number | string;
  rating?: number;
}

export function ReadingDiaryForm({
  title,
  author,
  cover,
  editora,
  numeroPaginas,
  anoPublicacao,
  idioma,
  isbn,
  rating,
}: ReadingDiaryFormProps) {
  const hoje = new Date();
  const anoLimite = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate() - 1).padStart(2, '0');
  const safeRating = rating ?? 0;
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;
  const [spoiler, setSpoiler] = useState<boolean>(false);
  const [menuOpen, setIsMenuOpen] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('Selecione');
  const [tituloResenha, setTituloResenha] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const temCapa =
    cover && cover !== 'Capa não cadastrada.' && cover.trim() !== '';

  const srcCapa = temCapa
    ? cover.startsWith('http')
      ? cover
      : `${process.env.NEXT_PUBLIC_API_URL}${cover}`
    : '';
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
            Diário de Leitura
          </h1>
          <p className="text-text-secondary text-sm lg:text-base mb-8 lg:mb-6">
            Registre e atualize o andamento da sua jornada.
          </p>

          <div className="flex gap-3 sm:gap-4 pl-3 pr-1 py-3 rounded-md bg-secondary-bg border border-border w-full group shadow-xs">
            <div className="w-[72px] h-[106px] sm:w-[107px] sm:h-[157px] bg-darker-gray rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md">
              {temCapa ? (
                <Image
                  src={srcCapa}
                  alt={`Capa do livro ${title}`}
                  fill
                  sizes="(min-width: 640px) 107px, 72px"
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-border/50 border border-border rounded-lg flex items-center justify-center p-2 text-center">
                  <span className="text-[10px] text-text-secondary leading-tight">
                    Sem Capa
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between min-w-0 flex-1 py-1 sm:p-2 lg:p-6">
              <div className="min-w-0">
                <h1 className="text-text-primary text-sm sm:text-md lg:text-2xl font-bold truncate">
                  {title}
                </h1>
                <p className="text-text-secondary text-sm lg:text-base truncate mt-1 sm:mt-3 font-medium">
                  {author || 'Autor desconhecido'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between min-w-0 flex-1 gap-1 sm:gap-4 mt-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-text-primary font-thin">
                    {editora && (
                      <div className="flex items-center gap-1.5 min-w-0 truncate">
                        <span className="truncate">
                          Editora{' '}
                          <strong className="font-sm text-text-primary">
                            {editora}
                          </strong>
                        </span>
                      </div>
                    )}

                    {anoPublicacao && (
                      <div className="flex items-center gap-1.5 min-w-0 truncate">
                        <span className="truncate">
                          <strong className="font-sm text-text-primary">
                            {anoPublicacao}
                          </strong>
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                      {numeroPaginas && (
                        <div className="flex items-center gap-1.5">
                          <span className="truncate">
                            <strong className="font-normal text-text-primary">
                              {numeroPaginas}
                            </strong>{' '}
                            páginas
                          </span>
                        </div>
                      )}
                    </div>

                    {idioma && (
                      <div className="flex items-center gap-1.5 min-w-0 truncate">
                        <span className="truncate">
                          <strong className="font-sm text-text-primary">
                            {idioma}
                          </strong>
                        </span>
                      </div>
                    )}

                    {isbn && (
                      <div className="flex items-center gap-1.5 min-w-0 truncate">
                        <span className="truncate">
                          ISBN{' '}
                          <strong className="font-sm text-text-primary">
                            {isbn}
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                data-testid="btn-excluir-diario"
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-2 text-sm text-brand hover:opacity-80 cursor-pointer font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash size={16} className="text-brand" />
              </button>
            </div>
          </div>

          <div className="py-5 lg:py-8">
            <div className="bg-secondary-bg border border-border rounded-md p-3">
              <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
                Cronologia de Leitura
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-text-primary text-xs">
                    Data de início <span className="text-brand">*</span>
                  </label>
                  <Input
                    id="dataDeInicio"
                    type="date"
                    max={`${anoLimite}-${mes}-${dia}`}
                    dataTestId="input-data-inicio"
                    className="text-xs text-text-primary uppercase w-full"
                  />
                </div>
                <div>
                  <label className="text-text-primary text-xs">
                    Data de término
                  </label>
                  <Input
                    id="dataDeTermino"
                    type="date"
                    max={`${anoLimite}-${mes}-${dia}`}
                    dataTestId="input-data-termino"
                    className="text-xs text-text-primary uppercase w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-2">
                <button
                  type="button"
                  data-testid="btn-cancelar"
                  className="px-10 py-3 text-xs text-white rounded-lg hover:opacity-80 transition-opacity duration-200 bg-dark-purple font-bold"
                >
                  Cancelar
                </button>

                <button
                  data-testid="btn-salvar"
                  type="submit"
                  disabled
                  className="px-10 py-3 text-xs text-white rounded-lg bg-brand font-bold hover:opacity-80"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
          <div className="bg-secondary-bg border border-border rounded-md p-3">
            <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-5">
              <NotebookPen size={14} /> Acompanhamento de Leitura
            </h2>
            <div>
              <button
                type="button"
                data-testid="btn-novo-registro-diario"
                className="flex text-xs text-white hover:opacity-80 transition-opacity duration-200 font-semibold pb-5"
              >
                <Plus size={14} /> <span className="pl-1">Novo Registro</span>
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-1 pb-3">
              <label className="text-text-primary text-xs">
                Páginas lidas<span className="text-brand">*</span>
              </label>
              <input
                data-testid="input-paginas"
                className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-3 text-text-primary text-xs"
                placeholder="1-613"
                id="numero-paginas-lidas"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-text-primary text-xs">Comentários</label>
              <textarea
                data-testid="input-comentarios"
                placeholder="Suas anotações privadas sobre esta seção de leitura"
                rows={6}
                className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-2 text-text-primary text-xs outline-none resize-none"
                id="ano-de-publicacao"
              />
            </div>
            <div className="flex justify-end gap-4 py-4">
              <button
                data-testid="btn-salvar"
                type="submit"
                disabled
                className="px-10 py-3 text-xs text-white rounded-lg bg-brand font-bold hover:opacity-80"
              >
                Salvar registro
              </button>
            </div>
            <div className="h-px bg-border" />
            <div>
              <h1 className="text-text-primary text-xs py-4">Histórico</h1>
              <div className="bg-secondary-bg border border-border rounded-md p-3">
                <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
                  <NotebookPen size={16} /> {/*numero de paginas lidas*/}{' '}
                  páginas lidas
                </h2>
                <div className="pt-3 pb-8">
                  <div className="bg-black border border-border rounded-md p-3">
                    <p className="flex items-center gap-2 text-text-primary/50 text-sm lg:text-md font-thin">
                      {/*texto do comentario*/}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5 lg:py-8">
            <div className="bg-secondary-bg border border-border rounded-md p-3">
              <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
                <BookHeart size={16} /> Avalie o Livro
              </h2>
              <h1 className="text-text-primary text-xs pt-3 pb-2">
                Sua Avaliação<span className="text-brand">*</span>
              </h1>
              <div className="flex flex-col gap-2 lg:gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {Array.from({ length: fullStars }).map((_, index) => (
                      <Star
                        key={`full-${index}`}
                        className="w-6 h-6 text-active fill-active"
                      />
                    ))}

                    {hasHalfStar && (
                      <div className="relative inline-block w-6 h-6">
                        <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden text-active">
                          <Star className="w-6 h-6 fill-active" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs">
                    Título da Resenha
                    <span className="pl-1 text-[8px]">
                      (opcional, max. 250 caracteres.)
                    </span>
                  </label>
                  <input
                    type="text"
                    maxLength={250}
                    placeholder="Dê um título à sua resenha"
                    value={tituloResenha}
                    onChange={(e) => setTituloResenha(e.target.value)}
                    className="w-full bg-secondary-bg border border-border rounded px-3 py-2 text-text-primary text-xs outline-none"
                  />
                  <span className="text-text-primary/50 text-[10px] self-start">
                    {tituloResenha.length}/250
                  </span>
                  <label className="flex items-center space-x-3 py-4 text-text-secondary cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={spoiler}
                      onChange={(e) => setSpoiler(e.target.checked)}
                      className="sr-only"
                    />

                    <div className="flex items-center justify-center w-4 h-4 rounded-md border border-border/50">
                      {spoiler && <Check className="w-3 h-3 stroke-3" />}
                    </div>
                    <span className="text-xs">Contém spoilers</span>
                  </label>

                  <label className="text-text-primary text-xs">
                    Resenha
                    <span className="pl-1 text-[8px]">
                      (opcional, min. 100 caracteres.)
                    </span>
                  </label>
                  <textarea
                    data-testid="input-comentarios"
                    placeholder="Escreva sua resenha aqui"
                    rows={6}
                    className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-2 text-text-primary text-xs outline-none resize-none"
                    id="ano-de-publicacao"
                  />
                  <h1 className="text-text-primary text-xs pt-4">
                    Compartilhamento
                  </h1>
                  <div className="flex flex-col lg:flex-row lg:flex-wrap justify-start gap-2">
                    <div className="relative w-full lg:w-auto">
                      <button
                        data-testid="btn-add-lista"
                        onClick={() => setIsMenuOpen(!menuOpen)}
                        className="w-full lg:w-70 flex items-center justify-between lg:mr-6 px-4 py-3 text-xs rounded-xs transition-opacity duration-200 text-white hover:brightness-110 cursor-pointer bg-border"
                      >
                        {opcaoSelecionada}
                        <ChevronDown
                          size={16}
                          className="text-text-primary/60"
                        />
                      </button>

                      {menuOpen && (
                        <div className="absolute left-0 mt-2 w-full lg:w-max bg-card-bg border border-border rounded-lg shadow-lg z-50">
                          <button
                            data-testid="btn-public-review"
                            onClick={() => {
                              setOpcaoSelecionada('Resenha pública');
                              setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                          >
                            Resenha pública
                          </button>
                          <div className="mx-4 h-px bg-border" />
                          <div className="cursor-pointer">
                            <button
                              data-testid="btn-private-review"
                              onClick={() => {
                                setOpcaoSelecionada('Resenha privada');
                                setIsMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                            >
                              Resenha privada
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <DeleteDiaryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
