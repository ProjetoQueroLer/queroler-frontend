import { UserEntity } from '@/core/domain/user/user.entity';
import { LoadUserProfileResponseDTO } from '@/core/application/user/load-user-profile-page-response.dto';
import {
  CreateUserData,
  UserRepository,
} from '@/core/domain/user/user.repository';
import { AxiosInstance, AxiosResponse } from 'axios';

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

  async carregarTelaDePerfilLeitura(): Promise<
    AxiosResponse<LoadUserProfileResponseDTO>
  > {
    try {
      return await this.api.get<LoadUserProfileResponseDTO>('/usuarios');
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async delete(): Promise<void> {
    try {
      await this.api.delete('/usuarios');
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
