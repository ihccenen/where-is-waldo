import { collection, addDoc } from 'firebase/firestore';
import db from './config';

export default async function validateUserPlay(data: { character: string; x: number; y: number }) {
  const docRef = await addDoc(collection(db, 'coordinates'), data);

  return Promise.resolve(docRef);
}
