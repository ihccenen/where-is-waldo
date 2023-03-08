import { useEffect, useReducer } from 'react';
import './App.css';
import Image from './components/Image';
import Username from './components/Username';
import { UserAction } from './components/types/UserAction.types';
import validateUserPlay from './firebase/validateUserPlay';

function msToTime(milliseconds: number) {
  return new Date(milliseconds).toISOString().slice(11, 19);
}

type UserInfo = {
  username: string | null;
  gameStart: number;
  message: string | null;
  foundCharacters: string[];
  gameEnd: number;
  scores: number[];
};

const initialState = {
  username: null,
  gameStart: 0,
  message: null,
  foundCharacters: [],
  gameEnd: 0,
  scores: [],
};

const reducer = (state: UserInfo, action: UserAction) => {
  switch (action.type) {
    case 'setUsername':
      return { ...state, username: action.payload };
    case 'setStart':
      return { ...state, gameStart: Date.now() };
    case 'setEnd':
      return { ...state, message: 'All characters have been found', gameEnd: Date.now() };
    case 'setMessage':
      return { ...state, message: action.payload };
    case 'addFoundCharacter':
      return {
        ...state,
        message: 'Correct',
        foundCharacters: state.foundCharacters.concat(action.payload),
      };
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

    dispatch({ type: 'setMessage', payload: 'Validating' });

    validateUserPlay(data)
      .then(() => dispatch({ type: 'addFoundCharacter', payload: character }))
      .catch(() => dispatch({ type: 'setMessage', payload: 'Wrong character or coordinates' }));
  };

  useEffect(() => {
    if (state.foundCharacters.length === 5) {
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
      {state.message && <p>{state.message}</p>}
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
