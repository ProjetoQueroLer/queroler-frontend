import Image from 'next/image';

export interface BookCardProps {
  title: string;
  author?: string;
  cover: string;
  id: string;
}

export function BookCard({ title, author, cover }: BookCardProps) {
  return (
    <div className="w-[150px] lg:w-[215px] bg-card-bg border border-border rounded-xl shadow-xs flex-shrink-0 relative hover:z-10 transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-[1.02] hover:-translate-y-1">
      {cover && cover !== 'Capa não cadastrada.' ? (
        <div className="relative w-full h-[120px] lg:h-[170px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${cover}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 150px, 215px"
            className="object-cover rounded-t-xl"
            priority={false}
          />
        </div>
      ) : (
        <div className="w-full h-[120px] lg:h-[170px] bg-border flex flex-col items-center justify-center gap-2 rounded-t-xl">
          <span className="text-text-secondary text-xs text-center px-4">
            Capa não cadastrada
          </span>
        </div>
      )}
      <div className="p-4 text-left">
        <span className="text-text-primary text-sm lg:text-base font-semibold">
          {title}
        </span>

        {author && (
          <span className="text-text-secondary text-sm font-thin mt-1 line-clamp-1">
            {author}
          </span>
        )}
      </div>
    </div>
  );
}
