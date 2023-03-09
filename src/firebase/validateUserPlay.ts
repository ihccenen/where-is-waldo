import { collection, addDoc } from 'firebase/firestore';
import db from './config';

export default async function validateUserPlay(data: { name: string; x: number; y: number }) {
  await addDoc(collection(db, 'coordinates'), data);
}
