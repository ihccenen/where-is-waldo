import { useEffect, useState } from 'react';
import './App.css';
import addScore from './firebase/addScore';
import getLeaderboard from './firebase/getLeaderboard';
import updateData from './firebase/updateUsername';
import validateUserPlay from './firebase/validateUserPlay';
import UsersScore from './types/UserScore.type';
import UserSubmit from './types/UserSubmit.type';
import Username from './components/Username';
import Image from './components/Image';
import Scoreboard from './components/Scoreboard';

export default function App() {
  const [leaderboard, setLeaderboard] = useState<UsersScore[]>([]);
  const [username, setUsername] = useState<string>('');
  const [foundPeople, setFoundPeople] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [userScores, setUserScores] = useState<UsersScore[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [highScoreId, setHighScoreId] = useState<string>('');

  const isGameOver = foundPeople.length === 5;

  if (isGameOver) {
    setFoundPeople([]);
    setUserScores((prev) => prev.concat({ time: Date.now() - timer }));
    setShowForm(true);
  }

  const handleUsernameSubmit: UserSubmit = (e, name) => {
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

  const handleScoreSubmit: UserSubmit = (e, name) => {
    e.preventDefault();

    const { time } = userScores[userScores.length - 1];

    addScore({ username: name, time })
      .then(setHighScoreId)
      .catch((err) => setMsg(err.message));

    setShowForm(false);
  };

  const handleUpdateDataSubmit: UserSubmit = (e, name) => {
    e.preventDefault();

    updateData(name, highScoreId);
    setHighScoreId('');
  };

  useEffect(() => {
    getLeaderboard().then((res) => setLeaderboard(res.leaderboard));
  }, []);

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
        <Username handleSubmit={handleUsernameSubmit} />
      )}
      {msg && <p>{msg}</p>}
      {userScores[0] && (
      <div>
        Scores:
        {' '}
        <Scoreboard scores={userScores} />
      </div>
      )}
      {leaderboard[0] && (
      <div>
        Leaderboard:
        {' '}
        <Scoreboard scores={leaderboard} />
      </div>
      )}
      {showForm && <Username handleSubmit={handleScoreSubmit} />}
      {highScoreId && <Username handleSubmit={handleUpdateDataSubmit} />}
    </div>
  );
}
