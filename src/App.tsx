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
    setShowForm(false);
    setHighScoreId('');
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
    <div className="content grid">
      {username ? (
        <>
          <div>
            <Image foundPeople={foundPeople} validatePlay={validatePlay} />
            <div className="center flex">
              <button className="restart-btn" type="button" onClick={handleRestartClick}>
                Restart
              </button>
              {msg && <p>{msg}</p>}
            </div>
          </div>
          <div className="scoreboards-container grid">
            <div className="scoreboard">
              {`${username} scores: `}
              {userScores[0] ? <Scoreboard scores={userScores} /> : <p>Empty</p>}
            </div>
            <div className="scoreboard">
              Leaderboard:
              {leaderboard[0] ? <Scoreboard scores={leaderboard} /> : <p>Empty</p>}
            </div>
          </div>
          {showForm && (
          <div className="username-form">
            All people have been found
            <Username handleSubmit={handleScoreSubmit} />
          </div>
          )}
          {highScoreId && (
          <div className="username-form">
            Highscore leaderboard
            <Username handleSubmit={handleUpdateDataSubmit} />
          </div>
          )}
        </>
      ) : (
        <div className="username-form">
          <Username handleSubmit={handleUsernameSubmit} />
        </div>
      )}
      {(showForm || highScoreId) && <div className="overlay" />}
    </div>
  );
}
