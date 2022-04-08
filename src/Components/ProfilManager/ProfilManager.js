// Library
import React, { useContext, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, sendEmailVerification } from 'firebase/auth';
// Own files
import styles from './ProfilManager.module.css';
import { LoginContext } from '../../hoc/Contexts/LoginContext';
import { auth, storage } from '../../config/firebase';
import useAuth from '../../customHook/useAuth';

const ProfilManager = (props) => {
  // Context
  const { user } = useContext(LoginContext);

  // Hooks
  const currentUser = useAuth();
  // console.log('currentUser ', currentUser);

  // State
  const [userInformations, setUserInformations] = useState({ ...user });
  const [URLpicture, setURLpicture] = useState(null);

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
        auth.currentUser.reload();
        props.history.push('/dashboard');
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  };

  const uploadFileHandler = async () => {
    // Firebase storage (for upload)
    const file = document.getElementById('URLpicture').files[0];
    const storageRef = ref(storage, `users/${user.uid}/${file.name}`);

    await uploadBytes(storageRef, file, file.name).then((snapshot) => {
      console.log('Uploaded file!');
    });

    const photoURL = await getDownloadURL(storageRef);

    updateProfile(currentUser, { photoURL });
  };

  const uploadForPreview = () => {
    const file = document.getElementById('URLpicture').files[0];

    const ObjectURLFile = window.URL.createObjectURL(file);
    setURLpicture(ObjectURLFile);
  };

  const handleSendEmailVerif = () => {
    sendEmailVerification(auth.currentUser).then((r) => {
      // Email sent.
      console.log('Email sent!');
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
            <button onClick={uploadFileHandler}>Envoyer</button>
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
