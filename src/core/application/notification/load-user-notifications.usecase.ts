import { NotificationRepository } from '@/core/domain/notification/notification.repository';
import { AxiosResponse } from 'axios';
import { LoadUserNotificationsPageResponseDTO } from '@/core/application/notification/load-user-notifications-response.dto';

export class LoadUserNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(): Promise<
    AxiosResponse<LoadUserNotificationsPageResponseDTO>
  > {
    return await this.notificationRepository.loadNotifications();
  }
}
