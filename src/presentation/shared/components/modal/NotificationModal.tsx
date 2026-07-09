'use client';

interface NotificationModalProps {
  unreadNotifications: number;
}

export function NotificationModal({
  unreadNotifications,
}: NotificationModalProps) {
  return (
    //Após definir como será a listagem de notificações e termos a alteração da api para ter a flag de lido/naolido
    // tratar as não lidas para ter o texto com a Classe text-text-primary
    <div className="absolute right-0 top-[42px] z-50 w-[320px] rounded-lg border border-border bg-card-bg p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          Notificações
        </h3>

        <span className="text-xs text-text-secondary">
          {unreadNotifications} não lida
        </span>
      </div>

      <div className="my-3 h-px bg-border" />

      <button className="w-full text-left">
        <h4 className="text-sm font-medium text-text-primary">
          Nova sugestão de leitura!
        </h4>

        <p className="mt-1 text-xs leading-5 text-text-primary">
          Um novo livro foi adicionado à seção de livros populares, confira na
          sua tela inicial.
        </p>
      </button>

      <div className="my-3 h-px bg-border" />

      <button className="w-full text-left">
        <h4 className="text-sm font-medium text-text-secondary">
          Nova sugestão de leitura!
        </h4>

        <p className="mt-1 text-xs leading-5 text-text-secondary">
          Um novo livro foi adicionado à seção de livros populares, confira na
          sua tela inicial.
        </p>
      </button>

      <div className="mt-3 h-px bg-border" />
    </div>
  );
}
