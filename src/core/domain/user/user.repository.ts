import { CreateUserDTO } from '@/core/application/user/create-user.dto';
import { UserEntity } from '@/core/domain/user/user.entity';

export interface UserRepository {
  create(data: CreateUserDTO): Promise<UserEntity>;
}
