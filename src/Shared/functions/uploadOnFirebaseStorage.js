// Library
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { ref } from 'firebase/storage';
import { toast } from 'react-toastify';
// Own files
import { storage } from '../../config/firebase';

const uploadFileHandler = async (setLoading, inputFileId, pathRef, setFileUploaded, userUid) => {
  // Firebase storage (for upload)
  setLoading(true);

  const file = document.getElementById(inputFileId).files[0];

  const storageRef = ref(storage, `users/${userUid}/${pathRef}`);

  await uploadBytes(storageRef, file, file.name).then((snapshot) => {
    toast.success('Votre image a bien été uploadée.');
    setFileUploaded(true);
    setLoading(false);
  });

  const photoURL = await getDownloadURL(storageRef);

  setLoading(false);
};
