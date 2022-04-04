import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';

export async function uploadOnFirebaseStorage(file, currentUser, setLoading) {
  const fileRef = ref(storage, `users/${currentUser.uid}/avatar`);

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);

  setLoading(false);
}
