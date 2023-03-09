import { useState } from 'react';
import './App.css';
import Image from './components/Image';
import Username from './components/Username';
import validateUserPlay from './firebase/validateUserPlay';

function msToTime(milliseconds: number) {
  return new Date(milliseconds).toISOString().slice(11, 19);
}

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [foundPeople, setFoundPeople] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [userScores, setUserScores] = useState<number[]>([]);

  const isGameOver = foundPeople.length > 4;
  if (isGameOver) {
    setUserScores((prev) => prev.concat(Date.now() - timer));
    setFoundPeople([]);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, name: string) => {
    e.preventDefault();

    setTimer(Date.now());
    setUsername(name);
  };

  const validatePlay = (data: { name: string; x: number; y: number }) => {
    const { name } = data;

    setMsg('Validating');
    validateUserPlay(data)
      .then(() => {
        setFoundPeople((prev) => prev.concat(name));
        setMsg('Correct');
      })
      .catch(() => setMsg('Wrong coordinates or person'));
  };

  const handleRestartClick = () => {
    setTimer(Date.now());
    setFoundPeople([]);
    setMsg('Game has been restarted');
  };

  return (
    <div>
      {username ? (
        <>
          <Image foundPeople={foundPeople} validatePlay={validatePlay} />
          <button type="button" onClick={handleRestartClick}>
            Restart
          </button>
        </>
      ) : (
        <Username handleSubmit={handleSubmit} />
      )}
      {msg && <p>{msg}</p>}
      {userScores[0] && (
        <div>
          Scores:
          {userScores.map((ms) => (
            <p key={Math.random()}>{msToTime(ms)}</p>
          ))}
        </div>
      )}
    </div>
  );
}
