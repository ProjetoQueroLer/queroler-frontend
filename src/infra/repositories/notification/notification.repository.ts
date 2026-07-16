import { AxiosInstance, AxiosResponse } from 'axios';
import { NotificationRepository } from '@/core/domain/notification/notification.repository';
import { LoadUserNotificationsPageResponseDTO } from '@/core/application/notification/load-user-notifications-response.dto';

export class ApiNotificationRepository implements NotificationRepository {
  constructor(private readonly api: AxiosInstance) {}

  async loadNotifications(): Promise<
    AxiosResponse<LoadUserNotificationsPageResponseDTO>
  > {
    try {
      return await this.api.get<LoadUserNotificationsPageResponseDTO>(
        '/notificacoes'
      );
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      await this.api.put('/notificacoes');
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
