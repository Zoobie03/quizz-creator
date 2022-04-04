import React, { useContext, useState, useEffect } from 'react';
import styles from './ProfilManager.module.css';
import { LoginContext } from '../../hoc/Contexts/LoginContext';
import { auth, storage } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { updateProfile, sendEmailVerification } from 'firebase/auth';

const ProfilManager = (props) => {
  // Context
  const { user } = useContext(LoginContext);

  // Component Did Mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;

      const userData = {
        displayName,
        email,
        photoURL,
        emailVerified,
        uid,
      };

      console.log(userData);
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
  });

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
      phoneNumber: data.phoneNumber,
    })
      .then(() => {
        // Profile updated!
        console.log('Profile updated!');
        auth.currentUser.reload();
        props.history.push('/dashboard');
        console.log(user);
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  };

  const uploadFileHandler = () => {
    // Our application
    const file = document.getElementById('URLpicture').files[0];

    const ObjectURLFile = window.URL.createObjectURL(file);
    setURLpicture(ObjectURLFile);

    // Firebase storage (for upload)
    const storageRef = ref(storage, `users/${user.uid}/${file.name}`);

    uploadBytes(storageRef, file, file.name).then((snapshot) => {
      console.log('Uploaded file!');
      console.log(snapshot);
    });
  };

  const handleSendEmailVerif = () => {
    sendEmailVerification(auth.currentUser).then((r) => {
      // Email sent.
      console.log('Email sent!');
      console.log(r);
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

          <label htmlFor='URLpicture'>
            Photo de profil
            <input type='file' id='URLpicture' onChange={uploadFileHandler} />
          </label>

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
