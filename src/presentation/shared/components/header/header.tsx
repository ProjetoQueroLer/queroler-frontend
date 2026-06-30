'use client';

import { Bell, ChevronDown, LogOut, NotebookPen, User } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/presentation/shared/lib/auth-context';
import { useRouter } from 'next/navigation';

export interface HeaderProps {
  fotoDePerfil?: string;
  nomeUsuario?: string;
}

export function Header({ nomeUsuario, fotoDePerfil }: HeaderProps) {
  const { logout } = useAuth();
  const [menuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 lg:py-5 bg-color-background border-b border-border/50">
      {fotoDePerfil ? (
        <Image
          src={fotoDePerfil}
          alt="Foto de perfil"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <Image
          src="/logo-small.svg"
          alt="Quero Ler"
          width={120}
          height={36}
          priority
          className="h-auto w-auto"
        />
      )}

      <div className="flex items-center gap-3">
        <div className="relative group">
          <NotebookPen size={20} className="text-color-text-primary" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card-bg border border-border text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Diário de leitura
          </span>
        </div>

        <div className="relative group">
          <Bell
            data-testid="bell-icon"
            size={20}
            className="text-text-secondary opacity-40"
          />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card-bg border border-border text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Notificação
          </span>
        </div>

        <div className="w-px h-5 bg-border hidden lg:block" />

        <div className="relative">
          <button
            data-testid="user-menu-trigger"
            onClick={() => setIsMenuOpen(!menuOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
              <Image
                src="/img1.png"
                alt="User Profile"
                width={150}
                height={150}
                className="rounded-full aspect-square object-cover"
              />
            </div>
            <span className="text-text-primary text-sm hidden lg:block">
              {nomeUsuario} Nome do usuario
            </span>
            <ChevronDown size={16} className="text-text-secondary" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-max bg-card-bg border border-border rounded-lg shadow-lg z-50">
              <div className="gap-2 px-4 py-3">
                <p className="text-text-primary text-sm font-medium">
                  {nomeUsuario} Nome do usuario
                </p>
                <p className="text-text-secondary text-xs pt-1">
                  email do usuario
                </p>
              </div>
              <div className="mx-4 h-px bg-text-secondary" />

              <div className="cursor-pointer">
                <button
                  data-testid="profile-button"
                  onClick={() => router.push('/perfil')}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                >
                  <User size={14} />
                  Meu perfil
                </button>
              </div>
              <div className="mx-4 h-px bg-text-secondary" />

              <div className="cursor-pointer">
                <button
                  data-testid="logout-button"
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                >
                  <LogOut size={14} />
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
