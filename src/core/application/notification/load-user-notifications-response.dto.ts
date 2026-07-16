export interface LoadUserNotificationsResponseDTO {
  id: number;
  notificacao: string;
  dataDeCriacao: string;
  visualizada: boolean;
}

export interface LoadUserNotificationsPageResponseDTO {
  content: LoadUserNotificationsResponseDTO[];
  totalElements: number;
  totalPages: number;
  number: number;
}
