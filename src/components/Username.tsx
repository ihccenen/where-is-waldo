import { useState } from 'react';

export default function Username({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, name: string) => void;
}) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  return (
    <form onSubmit={(e) => handleSubmit(e, value)}>
      <label htmlFor="username">
        Username
        <input type="text" name="username" id="username" onChange={handleChange} value={value} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
