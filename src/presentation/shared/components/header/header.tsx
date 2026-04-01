'use client';

import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoHeader } from '@/presentation/shared/components/logoHeader/LogoHeader';

export function Header() {
  const [menuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  function handleLogout() {
    router.push('/login');
  }

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-dark-purple border-b border-border">
      <LogoHeader />
      <div className="flex items-center gap-6">
        <Bell
          data-testid="bell-icon"
          className="text-text-secondary opacity-40 cursor-not-allowed"
          size={22}
        />

        <div className="relative">
          <button
            data-testid="user-menu-trigger"
            onClick={() => setIsMenuOpen(!menuOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-text-primary text-sm">Nome do usuário</span>
            <ChevronDown size={16} className="text-text-secondary" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-card-bg border border-border rounded-lg shadow-lg z-50">
              <button
                data-testid="logout-button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:bg-border rounded-lg"
              >
                <LogOut size={14} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
