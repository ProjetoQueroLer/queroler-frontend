'use client';

import { Bell, BookOpen, ChevronDown, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function handleLogout() {
    router.push('/');
  }

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4 bg-color-background border-b border-border">
      {/* Logo na esquerda */}
      <Image
        src="/logo-small.svg"
        alt="Quero Ler"
        width={120}
        height={36}
        priority
        className="h-auto w-auto"
      />

      {/* Ícones e Usuário na direita */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Ícone livro desabilitado */}
        <BookOpen size={20} className="text-color-text-primary" />

        {/* Sino desabilitado */}
        <Bell
          data-testid="bell-icon"
          size={20}
          className="text-text-secondary opacity-40"
        />

        {/* Separador vertical */}
        <div className="w-px h-5 bg-border" />

        {/* Dropdown */}
        <div className="relative min-w-fit">
          <button
            data-testid="user-menu-trigger"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-text-primary text-sm font-medium hidden lg:block">
              Nome do Usuário
            </span>
            <ChevronDown size={14} className="text-text-secondary" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[120px] bg-card-bg border border-border rounded-lg shadow-lg z-50 flex flex-col p-1">
              <button
                data-testid="profile-button"
                onClick={() => router.push('/')}
                className="w-full flex items-center px-4 py-2 text-sm text-color-text-primary hover:opacity-80 rounded-lg"
              >
                Perfil
              </button>

              <button
                data-testid="logout-button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-brand hover:opacity-80 rounded-lg"
              >
                <LogOut size={14} className="text-brand" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
