import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Username from '../Username';

describe('username', () => {
  it('renders input', () => {
    render(<Username handleClick={() => {}} />);

    const input = screen.getByRole('textbox', { name: /Username/i });

    expect(input).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Username handleClick={() => {}} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('calls handler', () => {
    const handleClick = jest.fn();

    render(<Username handleClick={handleClick} />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
