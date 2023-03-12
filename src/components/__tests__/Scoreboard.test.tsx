import { render, screen } from '@testing-library/react';
import Scoreboard from '../Scoreboard';

describe('scoreboard', () => {
  it('renders scores without names for the user scoreboard', () => {
    const times = [{ time: 1 }, { time: 2 }, { time: 3 }];
    render(<Scoreboard scores={times} />);

    const li = screen.getAllByRole('listitem');

    expect(li).toHaveLength(times.length);
  });

  it('renders scores with names for the highscore board', () => {
    const times = [{ username: 'User one', time: 1 }];
    render(<Scoreboard scores={times} />);

    const li = screen.getByText(/User one/i);

    expect(li).toBeInTheDocument();
  });
});
