import {
  collection, getDocs, orderBy, query, limit,
} from 'firebase/firestore';
import UsersScore from '../types/UserScore.type';
import db from './config';

export default async function getTopTenScores() {
  const q = query(collection(db, 'leaderboard'), orderBy('time'), limit(10));

  const querySnapshot = await getDocs(q);
  const leaderboard: UsersScore[] = [];
  const leaderboardIds: string[] = [];

  querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data() as UsersScore);
    leaderboardIds.push(doc.id);
  });

  return { leaderboard, leaderboardIds };
}
