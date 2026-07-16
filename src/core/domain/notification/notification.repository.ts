import { AxiosResponse } from 'axios';
import { LoadUserNotificationsPageResponseDTO } from '@/core/application/notification/load-user-notifications-response.dto';

export interface NotificationRepository {
  loadNotifications(): Promise<
    AxiosResponse<LoadUserNotificationsPageResponseDTO>
  >;

  markAllAsRead(): Promise<void>;
}
