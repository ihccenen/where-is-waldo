import { render, screen } from '@testing-library/react';
import Image from '../Image';

const fakeValidateData = (data: { x: number; y: number; character: string }) => data;

describe('image', () => {
  it('renders the image', () => {
    render(<Image validatePlay={fakeValidateData} />);

    const img = screen.getByRole('img', { hidden: true });

    expect(img).toBeInTheDocument();
  });

  it('does not render target when Image is not clicked', () => {
    render(<Image validatePlay={fakeValidateData} />);

    const target = screen.queryByTestId('target');

    expect(target).not.toBeInTheDocument();
  });
});
