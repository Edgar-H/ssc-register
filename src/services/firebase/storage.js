import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  getMetadata,
} from 'firebase/storage';
import { app } from './firebaseConfig';

const storage = getStorage(app);

export const uploadFile = (file, path) => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  const uploadFile = uploadBytes(storageRef, file).then(async (snapshot) => {
    return {
      url: await getDownloadURL(snapshot.ref).then((url) => url),
      metadata: await getMetadata(storageRef).then((metadata) => metadata),
    };
  });
  return uploadFile;
};

/* uploadBytesResumable,
.on('statechange', (snapshot) => {
          console.log('snapshot', snapshot);
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        }) */
