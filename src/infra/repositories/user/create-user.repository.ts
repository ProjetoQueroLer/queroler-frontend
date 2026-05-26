import { UserEntity } from '@/core/domain/user/user.entity';
import {
  ChangePasswordData,
  UserRepository,
} from '@/core/domain/user/user.repository';
import { AxiosInstance } from 'axios';

export class ApiUserRepository implements UserRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(data: string): Promise<UserEntity> {
    try {
      const formData = new FormData();
      formData.append('dados', data);
      const response = await this.api.post('/usuarios', formData);
      return response.data;
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await this.api.put('/usuarios/alterar-senha', data);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
