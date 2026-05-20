'use client';

import { Star } from 'lucide-react';

export function PopularBooks() {
  return (
    <div className="bg-card-bg border border-border rounded-xl px-4 py-3 lg:p-6 lg:py-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star size={18} className="text-brand" />
          <span className="text-text-primary text-sm lg:text-base font-semibold">
            Livros populares
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-thin px-2 py-1 rounded-xs">
            0 livros
          </span>
        </div>
      </div>
    </div>
  );
}
