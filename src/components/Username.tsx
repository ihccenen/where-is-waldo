import { useState } from 'react';
import { UserAction } from './types/UserAction.types';

export default function Username({ dispatch }: { dispatch: React.Dispatch<UserAction> }) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  const handleClick = () => {
    dispatch({ type: 'setUsername', payload: value });
    dispatch({ type: 'setStart' });
  };

  return (
    <div>
      <label htmlFor="username">
        Username
        <input type="text" name="username" id="username" onChange={handleChange} value={value} />
      </label>
      <button type="button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}
