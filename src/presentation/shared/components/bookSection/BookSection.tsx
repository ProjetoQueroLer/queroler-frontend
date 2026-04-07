import { ReactNode } from 'react';

interface BookSectionProps {
  title: string;
  tag: string;
  tagColor: string;
  icon: ReactNode;
}

export function BookSection({ title, tag, tagColor, icon }: BookSectionProps) {
  return (
    <div className="bg-card-bg border border-border rounded-xl px-4 lg:p-6 py-3 lg:py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-text-primary text-sm lg:text-base font-semibold">
            {title}
          </span>
        </div>

        <span
          className={`${tagColor} flex items-center gap-1 text-xs font-thin px-2 py-1 rounded-xs`}
        >
          {tag}
        </span>
      </div>

      <div className="flex items-center gap-3 min-h-[120px]">
        <p className="text-text-secondary text-sm">Nenhum livro ainda.</p>
      </div>
    </div>
  );
}
