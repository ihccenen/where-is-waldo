import React, { useState } from 'react';
import img from '../image/image.jpg';
import Target from './Target';

const characters = [
  {
    name: 'Wizard Whitebeard',
    id: 1,
  },
  {
    name: 'Woof',
    id: 2,
  },
  {
    name: 'Odlaw',
    id: 3,
  },
  {
    name: 'Wenda',
    id: 4,
  },
  {
    name: 'Waldo',
    id: 5,
  },
];

export default function Image({
  foundPeople,
  validatePlay,
}: {
  foundPeople?: string[];
  validatePlay: (data: { x: number; y: number; name: string }) => void;
}) {
  const [displayTarget, setDisplayTarget] = useState(false);
  const [value, setValue] = useState('');
  const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - left);
    const y = Math.round(e.clientY - top);

    setDisplayTarget((prev) => !prev);
    setCoordinates({ x, y });
  };

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => setValue(e.currentTarget.value);

  const handleConfirmClick = () => {
    if (!coordinates || value === '') return;

    const { x, y } = coordinates;
    const data = {
      x,
      y,
      name: value,
    };

    validatePlay(data);
    setDisplayTarget((prev) => !prev);
    setValue('');
  };

  return (
    <div className="image-container">
      <img
        src={img}
        alt="Where's Waldo, Andes Mountain, Chile"
        onClick={handleImageClick}
        aria-hidden="true"
      />
      {displayTarget && (
        <Target
          value={value}
          list={characters.filter(({ name }) => !foundPeople?.includes(name))}
          handleChange={handleChange}
          handleClick={handleConfirmClick}
          style={{
            top: `${coordinates?.y}px`,
            left: `${coordinates?.x}px`,
          }}
        />
      )}
    </div>
  );
}

Image.defaultProps = {
  foundPeople: [],
};
