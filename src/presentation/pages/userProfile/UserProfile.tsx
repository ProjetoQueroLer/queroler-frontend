'use client';

import { useRef, useState, useTransition, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Header } from '@/presentation/shared/components/header/header';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function UserProfile() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formDesabilitado] = useState(true);
  const [_isPending, startTransition] = useTransition();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6 lg:px-8">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
          Meu perfil
        </h1>
        <p className="text-text-subtitle text-sm lg:text-base mb-6">
          Cadastre e edite as informações do seu perfil.
        </p>

        <form className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-3 w-full lg:w-[220px]">
            <span className="text-brand text-xs uppercase tracking-widest">
              Foto de perfil
            </span>
            <div
              onClick={triggerFileInput}
              className={`w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] bg-border-default border-2 border-dashed border-border rounded-xs flex flex-col items-center justify-center gap-2 hover:opacity-80 relative overflow-hidden ${formDesabilitado ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                ref={fileInputRef}
                disabled={formDesabilitado}
                onChange={handleFileChange}
              />
              {previewImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={previewImage}
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100px, 200px"
                  />
                </div>
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
                Nome completo
              </label>
              <input
                data-testid="input-nome"
                className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                id="nome"
                placeholder="Ex: João da Silva"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-text-secondary text-xs uppercase tracking-widest">
                E-mail
              </label>
              <input
                data-testid="input-email"
                className="bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                id="email"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  CPF
                </label>
                <input
                  data-testid="input-cpf"
                  placeholder="Ex: 123.456.789-00"
                  className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary"
                  id="cpf"
                  maxLength={11}
                />
              </div>
              <div className="relative flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Data de nascimento
                </label>
                <div className="relative">
                  <input
                    type="text"
                    data-testid="input-nascimento"
                    placeholder="Ex: 01/02/1234"
                    maxLength={10}
                    value={date}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, '');
                      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                      if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5);
                      setDate(v);
                    }}
                    className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary"
                    id="data-picker"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  País
                </label>
                <div className="relative">
                  <select
                    data-testid="input-pais"
                    className="w-full appearance-none bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="pais"
                  >
                    <option value="">Selecione um país</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                    ▾
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Estado
                </label>
                <div className="relative">
                  <select
                    data-testid="input-estado"
                    className="w-full appearance-none bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="estado"
                  >
                    <option value="">Selecione um estado</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                    ▾
                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-text-secondary text-xs uppercase tracking-widest">
                  Cidade
                </label>
                <input
                  data-testid="input-cidade"
                  className="w-full bg-card-bg border border-border rounded-xs px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                  id="cidade"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-2">
              <button
                type="button"
                data-testid="btn-excluir-perfil"
                onClick={() => {
                  toast.success('Perfil excluído.', {
                    autoClose: 1500,
                  });
                  startTransition(async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1500));
                    router.back();
                  });
                }}
                className="px-2 text-sm text-brand hover:opacity-80 cursor-pointer uppercase font-bold"
              >
                Excluir perfil
              </button>
              <button
                type="button"
                data-testid="btn-voltar"
                onClick={() => {
                  startTransition(async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1500));
                    router.back();
                  });
                }}
                className="px-6 py-3 text-sm text-white rounded-lg hover:opacity-80 transition-opacity duration-200 bg-dark-purple uppercase font-bold"
              >
                Voltar
              </button>
              <button
                data-testid="btn-salvar"
                type="submit"
                disabled={formDesabilitado}
                className="px-6 py-3 text-sm text-white rounded-lg hover:opacity-80 transition-opacity duration-200 bg-brand uppercase font-bold"
              >
                Salvar dados
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
