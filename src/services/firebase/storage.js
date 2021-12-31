import { getStorage } from 'firebase/storage';
import app from './firebaseConfig';

const storage = getStorage(app);

export const uploadFile = (file, path) => {
  const storageRef = storage.ref(path);
  const task = storageRef.put(file);
  return task;
};
