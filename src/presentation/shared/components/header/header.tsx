'use client';

import { Bell, ChevronDown, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/presentation/shared/lib/auth-context';

export interface HeaderProps {
  fotoDePerfil?: string;
  nomeUsuario?: string;
}

export function Header({ nomeUsuario, fotoDePerfil }: HeaderProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4 bg-color-background border-b border-border">
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

      <div className="flex items-center gap-3 lg:gap-6">
        <div className="relative group">
          <BookOpen size={20} className="text-color-text-primary" />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-card-bg border border-border text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Leitura
          </span>
        </div>

        <div className="relative group">
          <Bell
            data-testid="bell-icon"
            size={20}
            className="text-text-secondary opacity-40"
          />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-card-bg border border-border text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
              <User size={16} className="text-white" />
            </div>
            <span className="text-text-primary text-sm hidden lg:block">
              {nomeUsuario} Nome do usuario
            </span>
            <ChevronDown size={16} className="text-text-secondary" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-36 bg-card-bg border border-border rounded-lg shadow-lg z-50 ">
              <div className="gap-2 px-4 py-3 border-b border-border">
                <p className="text-text-primary text-sm font-medium">
                  {nomeUsuario} Nome do usuario
                </p>
                <p className="text-text-secondary text-xs">email do usuario</p>
              </div>

              <div className="border-b border-border hover:bg-border cursor-pointer">
                <button
                  data-testid="profile-button"
                  onClick={() => router.push('/perfil')}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary"
                >
                  <User size={14} />
                  Meu perfil
                </button>
              </div>
              <div className="border-b border-border hover:bg-border rounded-b-lg cursor-pointer">
                <button
                  data-testid="logout-button"
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-brand"
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
