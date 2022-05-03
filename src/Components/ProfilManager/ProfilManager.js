// Library
import React, { useContext, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, sendEmailVerification } from 'firebase/auth';
// Own files
import styles from './ProfilManager.module.css';
import { LoginContext } from '../../hoc/Contexts/LoginContext';
import { auth, storage } from '../../config/firebase';
import useAuth from '../../customHook/useAuth';
import LoadingSvg from '../../pictures/loading/LoadingSvg.jsx';
import { toast } from 'react-toastify';

const ProfilManager = (props) => {
  // Context
  const { user } = useContext(LoginContext);

  // Hooks
  const currentUser = useAuth();
  // State
  const [userInformations, setUserInformations] = useState({ ...user });
  const [URLpicture, setURLpicture] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Methods
  const settingsProfilClickHandler = (event) => {
    event.preventDefault();

    const inputs = [...document.querySelectorAll('input')].filter(
      (input) => input.id !== 'email' && input.id !== 'uid' && input.id !== 'URLpicture'
    );

    const data = {};

    inputs.forEach((input) => {
      data[input.id] = input.value;
    });

    updateProfile(auth.currentUser, {
      displayName: data.displayName,
    })
      .then(() => {
        // Profile updated!
        console.log('Profile updated!');
        toast.info('Profil mis à jour.');
        auth.currentUser.reload();
        // props.history.push('/dashboard');
      })
      .catch((error) => {
        // An error occurred
        toast.warning('Une erreur est survenue. Réessayer plus tard.');
        console.log(error);
      });
  };

  const uploadFileHandler = async () => {
    // Firebase storage (for upload)
    setLoading(true);

    const file = document.getElementById('URLpicture').files[0];
    const storageRef = ref(storage, `users/${user.uid}/profil-picture.jpg`);

    await uploadBytes(storageRef, file, file.name).then((snapshot) => {
      console.log('Uploaded file!');
      toast.success('Votre image a bien été uploadée.');
      setFileUploaded(true);
      setLoading(false);
    });

    const photoURL = await getDownloadURL(storageRef);

    updateProfile(currentUser, { photoURL });
  };

  const uploadForPreview = () => {
    setFileUploaded(false);

    const file = document.getElementById('URLpicture').files[0];

    const ObjectURLFile = window.URL.createObjectURL(file);
    setURLpicture(ObjectURLFile);
  };

  const handleSendEmailVerif = () => {
    sendEmailVerification(auth.currentUser).then((r) => {
      // Email sent.
      toast.info('Un email de vérification vous a été envoyé.');
    });
  };

  return (
    <div className={styles.ProfilManager}>
      <h1>Bienvenue {userInformations.displayName}</h1>
      <div className={styles.wrapperProfil}>
        <form onSubmit={settingsProfilClickHandler}>
          <label htmlFor='displayName'>
            Pseudonyme
            <input type='text' id='displayName' defaultValue={userInformations.displayName} />
          </label>

          <label htmlFor='email'>
            Email
            <input type='email' id='email' defaultValue={userInformations.email} disabled />
          </label>

          <p className={styles.emailVerif}>
            Email vérifié: {userInformations.emailVerified ? '✅' : '❌'}
          </p>
          {userInformations.emailVerified ? null : (
            <button onClick={handleSendEmailVerif}>M'envoyer un email de vérification</button>
          )}
          <label htmlFor='URLpicture'>Photo de profil</label>
          <div className={styles.fileUploader}>
            <input type='file' id='URLpicture' onChange={uploadForPreview} />
            {loading ? (
              <LoadingSvg />
            ) : fileUploaded ? (
              <button className={styles.successButton}>Reçu !</button>
            ) : (
              <button
                onClick={uploadFileHandler}
                disabled={document.getElementById('URLpicture')?.files[0] ? false : true}
              >
                Envoyer
              </button>
            )}
          </div>

          <label htmlFor='uid'>
            ID Utilisateur
            <input
              type='text'
              id='uid'
              defaultValue={userInformations.uid}
              disabled
              onChange={(e) => setUserInformations(e.target.value)}
            />
          </label>
          <button type='submit'>Valider les changements</button>
        </form>
        <div className={styles.picturePreview}>
          {URLpicture ? (
            <img id='picturePreview' src={URLpicture} alt='Preview' />
          ) : (
            <p>Aucun fichier choisi</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilManager;
