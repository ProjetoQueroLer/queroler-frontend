import { render, screen } from '@/presentation/shared/lib/test-utils';
import { Login } from '@/presentation/pages/login';

describe('Login page', () => {
  it('deve renderizar o heading de boas-vindas', () => {
    render(<Login />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /bem-vindo/i,
      })
    ).toBeInTheDocument();
  });
});
