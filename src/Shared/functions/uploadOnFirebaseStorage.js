import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';

export async function uploadOnFirebaseStorage(file, currentUser, setLoading) {
  const fileRef = ref(storage, `users/${currentUser.uid}/avatar`);

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);
}
