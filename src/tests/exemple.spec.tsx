import { render, screen } from '@/lib/test-utils';

describe('Example test', () => {
  it('should pass', () => {
    render(<div>Example</div>);

    expect(screen.getByText('Example')).toBeInTheDocument();
  });
});
