'use server';

import api from '@/infra/http/api';
import { ApiUserRepository } from '@/infra/repositories/user/create-user.repository';

export async function loadUserProfilePageAction() {
  try {
    const repository = new ApiUserRepository(api);

    const response = await repository.carregarTelaDePerfilLeitura();

    return {
      success: true,
      response: response.data,
    };
  } catch {
    return {
      success: false,
      message: 'Não foi possível carregar a tela de perfil do usuário.',
    };
  }
}
