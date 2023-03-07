import { useEffect, useReducer } from 'react';
import './App.css';
import Image from './components/Image';
import Username from './components/Username';
import { UserAction } from './components/types/UserAction.types';

function msToTime(milliseconds: number) {
  return new Date(milliseconds).toISOString().slice(11, 19);
}

type UserInfo = {
  username: string | null;
  foundCharacters: string[];
  gameStart: number;
  gameEnd: number;
  scores: number[];
};

const initialState = {
  username: null,
  gameStart: 0,
  gameEnd: 0,
  scores: [],
  foundCharacters: [],
};

const reducer = (state: UserInfo, action: UserAction) => {
  switch (action.type) {
    case 'setUsername':
      return { ...state, username: action.payload };
    case 'setStart':
      return { ...state, gameStart: Date.now() };
    case 'setEnd':
      return { ...state, gameEnd: Date.now() };
    case 'addFoundCharacter':
      return { ...state, foundCharacters: state.foundCharacters.concat(action.payload) };
    case 'addScore':
      return { ...state, scores: state.scores.concat(state.gameEnd - state.gameStart) };
    case 'restart':
      return {
        ...state,
        gameStart: Date.now(),
        foundCharacters: [],
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validatePlay = (data: { x: number; y: number; character: string }) => {
    const { character } = data;

    dispatch({ type: 'addFoundCharacter', payload: character });
  };

  useEffect(() => {
    if (state.foundCharacters.length === 4) {
      dispatch({ type: 'setEnd' });
      dispatch({ type: 'addScore' });
      dispatch({ type: 'restart' });
    }
  }, [state.foundCharacters]);

  return (
    <div>
      {state.username ? (
        <Image foundCharacters={state.foundCharacters} validatePlay={validatePlay} />
      ) : (
        <Username dispatch={dispatch} />
      )}
      {state.scores[0] && (
        <div>
          Scores:
          {state.scores.map((s) => (
            <p key={Math.random()}>{msToTime(s)}</p>
          ))}
        </div>
      )}
    </div>
  );
}
