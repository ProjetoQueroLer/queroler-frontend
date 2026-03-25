import { render, screen } from '@/lib/test-utils';
import Login from '@/presentation/pages/login/login';

describe('Login page', () => {
  it('should render the login heading', () => {
    render(<Login />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /login/i,
      })
    ).toBeInTheDocument();
  });
});
