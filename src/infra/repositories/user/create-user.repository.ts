import { UserEntity } from '@/core/domain/user/user.entity';
import {
  CreateUserData,
  UserRepository,
} from '@/core/domain/user/user.repository';
import { AxiosInstance } from 'axios';

export class ApiUserRepository implements UserRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(data: CreateUserData): Promise<UserEntity> {
    try {
      const response = await this.api.post('/usuarios', data);
      return response.data;
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
