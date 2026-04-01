import { UserRepository } from '@/core/domain/user/user.repository';
import { CreateUserDTO } from '@/core/application/user/create-user.dto';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<void> {
    await this.userRepository.create(data);
  }
}
