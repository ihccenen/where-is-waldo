import { useState } from 'react';

export default function Username({ handleClick }: { handleClick: (name: string) => void }) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  return (
    <div>
      <label htmlFor="username">
        Username
        <input type="text" name="username" id="username" onChange={handleChange} value={value} />
      </label>
      <button type="button" onClick={() => handleClick(value)}>
        Submit
      </button>
    </div>
  );
}
