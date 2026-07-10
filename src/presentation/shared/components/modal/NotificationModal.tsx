'use client';

interface NotificationModalProps {
  unreadNotifications: number;
}

export function NotificationModal({
  unreadNotifications,
}: NotificationModalProps) {
  //Dados mockados, serão alterados após definir como será a listagem de notificações da api de backend
  const notifications = [
    {
      title: 'Nova sugestão de leitura!',
      description:
        'Um novo livro foi adicionado à seção de livros populares, confira na sua tela inicial.',
      unread: true,
    },
    {
      title: 'Nova sugestão de leitura!',
      description:
        'Um novo livro foi adicionado à seção de livros populares, confira na sua tela inicial.',
      unread: true,
    },
    {
      title: 'Nova sugestão de leitura!',
      description:
        'Um novo livro foi adicionado à seção de livros populares, confira na sua tela inicial.',
      unread: false,
    },
  ];
  return (
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

      <div
        className={
          notifications.length > 2
            ? 'max-h-[190px] overflow-y-auto scrollbar-hidden'
            : ''
        }
      >
        {notifications.map((notification, index) => (
          <div key={index}>
            <button className="w-full text-left">
              <h4
                className={`text-sm font-medium ${
                  notification.unread
                    ? 'text-text-primary'
                    : 'text-text-secondary'
                }`}
              >
                {notification.title}
              </h4>

              <p
                className={`mt-1 text-xs leading-5 ${
                  notification.unread
                    ? 'text-text-primary'
                    : 'text-text-secondary'
                }`}
              >
                {notification.description}
              </p>
            </button>

            {index < notifications.length - 1 && (
              <div className="my-3 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
