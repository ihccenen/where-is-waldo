import { useState } from 'react';
import './App.css';
import UserForm from './components/Username';

export default function App() {
  const [user, setUser] = useState('');

  const handleClick = (name: string) => setUser(name);

  return <div>{user ? <p>{user}</p> : <UserForm handleClick={handleClick} />}</div>;
}
