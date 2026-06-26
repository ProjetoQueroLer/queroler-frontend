'use client';

import { useRef, useState, useTransition, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Header } from '@/presentation/shared/components/header/header';
import { useRouter } from 'next/navigation';
import { loadUserProfilePageAction } from '@/app/actions/loadUserProfilePage.actions';
import { useEffect } from 'react';
import { DeleteProfileModal } from '@/presentation/shared/components/deleteProfileModal/DeleteProfileModal';
import { deleteUserProfileAction } from '@/app/actions/deleteUserProfile.actions';
import { toast } from 'react-toastify';
import { useAuth } from '@/presentation/shared/lib/auth-context';
import { Profile } from '@/core/domain/user/profile.enum';

export function UserProfile() {
  const router = useRouter();
  const { logout } = useAuth();
  const [date, setDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formDesabilitado] = useState(true);
  const [_isPending, startTransition] = useTransition();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await loadUserProfilePageAction();
        console.log('Resposta da API:', result);
        if (result.success && result.response) {
          setUserProfile(result.response.profile);
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };

    loadData();
  }, []);

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

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');

    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5);

    setDate(v);
  };

  const handleConfirmDelete = async () => {
    const result = await deleteUserProfileAction();
    if (result.success) {
      setIsDeleteModalOpen(false);
      logout();
    } else {
      toast.error(result.message || 'Erro ao excluir perfil.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen lg:mx-50 flex flex-col">
        <main className="flex-1 px-4 py-6 lg:px-8">
          <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
            Meu perfil
          </h1>
          <p className="text-text-secondary text-sm lg:text-base mb-6">
            Cadastre e edite as informações do seu perfil.
          </p>

          <form className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col gap-3 w-full lg:w-[220px]">
              <span className="text-brand text-xs tracking-widest">
                Foto de perfil
              </span>
              <div
                onClick={triggerFileInput}
                className={`w-[100px] h-[140px] lg:w-[200px] lg:h-[290px] bg-border border-2 border-dashed border-text-secondary flex flex-col items-center justify-center hover:opacity-80 relative overflow-hidden ${formDesabilitado ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
                    <span className="text-text-primary text-xs text-center px-4">
                      JPG, PNG ou JPEG
                    </span>
                    <span className="text-text-primary text-xs text-center px-4">
                      Tamanho máximo 10MB
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    Nome completo
                  </label>
                  <input
                    data-testid="input-nome"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary"
                    id="nome"
                    placeholder="Ex: João da Silva"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    E-mail
                  </label>
                  <input
                    data-testid="input-email"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="email"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    CPF
                  </label>
                  <input
                    data-testid="input-cpf"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="cpf"
                    maxLength={11}
                  />
                </div>
                <div className="relative flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    Data de nascimento
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      data-testid="input-nascimento"
                      placeholder="Ex: 01/02/1234"
                      maxLength={10}
                      value={date}
                      onChange={handleDateChange}
                      className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none placeholder:text-text-secondary"
                      id="data-picker"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    Cidade
                  </label>
                  <input
                    data-testid="input-cidade"
                    className="w-full bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="cidade"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-text-primary text-xs tracking-widest">
                    Estado
                  </label>
                  <div className="relative">
                    <select
                      data-testid="input-estado"
                      className="w-full appearance-none bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                      id="estado"
                    >
                      <option value="">Selecione o estado</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                      ▾
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-text-primary text-xs tracking-widest">
                  País
                </label>
                <div className="relative">
                  <select
                    data-testid="input-pais"
                    className="w-full appearance-none bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-sm outline-none"
                    id="pais"
                  >
                    <option value="">Selecione um país</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                    ▾
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-2">
                <button
                  type="button"
                  data-testid="btn-excluir-perfil"
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={userProfile !== Profile.LEITOR}
                  className="px-2 text-sm text-brand hover:opacity-80 cursor-pointer font-bold disabled:opacity-40 disabled:cursor-not-allowed"
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
                  className="px-9 py-3 text-sm text-white rounded-lg hover:opacity-80 transition-opacity duration-200 bg-dark-purple font-bold"
                >
                  Voltar
                </button>
                <button
                  data-testid="btn-salvar"
                  type="submit"
                  disabled={formDesabilitado}
                  className="px-9 py-3 text-sm text-white rounded-lg hover:opacity-80 transition-opacity duration-200 bg-brand font-bold"
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
      <DeleteProfileModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
