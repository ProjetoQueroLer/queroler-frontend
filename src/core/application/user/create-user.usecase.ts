import { UserEntity } from '@/core/domain/user/user.entity';
import { UserRepository } from '@/core/domain/user/user.repository';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: string): Promise<UserEntity> {
    return await this.userRepository.create(data);
  }
}
