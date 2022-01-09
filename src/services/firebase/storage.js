import {
  getDownloadURL,
  ref,
  uploadBytes,
  getMetadata,
} from 'firebase/storage';
import { storage } from './firebaseConfig';

export const uploadFile = (file, path) => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  const uploadFile = uploadBytes(storageRef, file).then(async (snapshot) => {
    return {
      url: await getDownloadURL(snapshot.ref).then((url) => url),
      metadata: await getMetadata(storageRef).then((metadata) => metadata),
    };
  });
  // dispatch(isLoading(progreso));
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
