import { addDoc, collection } from 'firebase/firestore';
import UserScore from '../types/UserScore.type';
import db from './config';
import getLeaderboard from './getLeaderboard';

export default async function addScore(data: UserScore) {
  const docRef = await addDoc(collection(db, 'leaderboard'), data);

  return new Promise((resolve: (id: string) => void) => {
    getLeaderboard().then((res) => {
      if (res.leaderboardIds.includes(docRef.id)) resolve(docRef.id);

      resolve('');
    });
  });
}
