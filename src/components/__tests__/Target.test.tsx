import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Target from '../Target';

describe('target', () => {
  it('renders select', () => {
    render(<Target />);

    const select = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();
  });

  it('renders confirm button', () => {
    render(<Target />);

    const btn = screen.getByRole('button', { name: 'Confirm' });

    expect(btn).toBeInTheDocument();
  });

  it('number of options + default equals list length', () => {
    const list = [
      {
        name: 'One',
        id: 1,
      },
      {
        name: 'Two',
        id: 2,
      },
      {
        name: 'Three',
        id: 3,
      },
    ];

    render(<Target list={list} />);

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(list.length + 1);
  });

  it('calls change handler', () => {
    const handleChange = jest.fn();

    render(<Target handleChange={handleChange} />);

    const select = screen.getByRole('combobox');

    userEvent.selectOptions(select, '');

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls click handler', () => {
    const handleClick = jest.fn();

    render(<Target handleClick={handleClick} />);

    const btn = screen.getByRole('button', { name: 'Confirm' });

    userEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
