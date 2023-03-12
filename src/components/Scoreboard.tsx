import UsersScore from '../types/UserScore.type';

function msToTime(milliseconds: number) {
  return new Date(milliseconds).toISOString().slice(11, 19);
}

export default function Scoreboard({ scores }: { scores: UsersScore[] }) {
  return (
    <div>
      <ol>
        {scores.map(({ username, time }) => (
          <li key={time}>
            {username && (
            <span>
              {username}
              :
              {' '}
            </span>
            )}
            {msToTime(time)}
          </li>
        ))}
      </ol>
    </div>
  );
}
