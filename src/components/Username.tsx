import { useState } from 'react';
import UserSubmit from '../types/UserSubmit.type';

export default function Username({ handleSubmit }: { handleSubmit: UserSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  return (
    <form className="username-form" onSubmit={(e) => handleSubmit(e, value)}>
      <label className="grid username-label" htmlFor="username">
        Username
        <input
          type="text"
          name="username"
          id="username"
          className="username-input"
          onChange={handleChange}
          value={value}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
