import { doc, updateDoc } from 'firebase/firestore';
import db from './config';

export default async function updateData(name: string, id: string) {
  const scoreRef = doc(db, 'leaderboard', id);

  await updateDoc(scoreRef, {
    username: name,
  });
}
