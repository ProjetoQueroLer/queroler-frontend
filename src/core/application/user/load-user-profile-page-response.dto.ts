import { Profile } from '@/core/domain/user/profile.enum';

export interface LoadUserProfileResponseDTO {
  nome: string;
  email: string;
  dataDeNascimento: string;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  foto: string | null;
  profile: Profile;
}
