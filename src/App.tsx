import { useState } from 'react';
import './App.css';
import Image from './components/Image';
import Username from './components/Username';

export default function App() {
  const [user, setUser] = useState('');
  const [foundCharacters, setFoundCharacters] = useState<string[]>([]);

  const handleClick = (name: string) => {
    setUser(name);
  };

  const validatePlay = (data: { x: number; y: number; character: string }) => {
    const { character } = data;

    setFoundCharacters((prev) => prev.concat(character));
  };

  return (
    <div>
      {user ? (
        <Image foundCharacters={foundCharacters} validatePlay={validatePlay} />
      ) : (
        <Username handleClick={handleClick} />
      )}
    </div>
  );
}
