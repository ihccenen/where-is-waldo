import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDBwI1QcRt6j-6HrOypswCDJiSQcucAQ64',
  authDomain: 'whereiswaldo-3de54.firebaseapp.com',
  projectId: 'whereiswaldo-3de54',
  storageBucket: 'whereiswaldo-3de54.appspot.com',
  messagingSenderId: '971479393192',
  appId: '1:971479393192:web:ceab2f760a2f0efc3eb39d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
