import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="flex items-center gap-2 bg-search-border border border-border-default rounded-md m-1 mb-6 px-2 py-2 lg:px-3 lg:py-3">
      <div className="flex-1 flex items-center gap-2 bg-card-bg border border-border-default rounded-sm px-1 py-1 lg:px-4 lg:py-3">
        <Search size={16} className="text-text-secondary" />
        <input
          data-testid="search-input"
          type="text"
          placeholder="Pesquisar na sua biblioteca..."
          className="flex-1 bg-transparent text-text-primary text-sm outline-none placeholder:text-text-secondary"
        />
      </div>

      <div className="flex items-center gap-1 bg-darker-gray rounded-sm px-1 py-1 lg:px-4 lg:py-3 cursor-pointer">
        <span className="text-text-primary text-sm hidden lg:block">
          Título do livro
        </span>
        <ChevronDown size={14} className="text-text-secondary" />
      </div>

      <button
        data-testid="filter-button"
        className="flex items-center gap-2 bg-primary-button rounded-sm px-1 py-1 lg:px-4 lg:py-1 cursor-pointer hover:opacity-80"
      >
        <SlidersHorizontal size={16} className="text-text-primary" />
        <span className="text-text-primary text-sm hidden lg:block lg:py-2">
          Filtrar
        </span>
      </button>
    </div>
  );
}
