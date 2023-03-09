import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Username from '../Username';

describe('username', () => {
  it('renders input', () => {
    render(<Username handleSubmit={() => {}} />);

    const input = screen.getByRole('textbox', { name: /Username/i });

    expect(input).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Username handleSubmit={() => {}} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('calls handler', () => {
    const handleSubmit = jest.fn().mockImplementationOnce((e) => e.preventDefault());

    render(<Username handleSubmit={handleSubmit} />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
