import React, { useContext, useState } from 'react';
import styles from './ProfilManager.module.css';
import { LoginContext } from '../../hoc/Contexts/LoginContext';
import { storageRef } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';

const ProfilManager = (props) => {
  // Context
  const { user } = useContext(LoginContext);

  // State
  const [username, setUsername] = useState({ ...user });
  const [URLpicture, setURLpicture] = useState(null);

  // Methods
  const settingsProfilClickHandler = (event) => {
    event.preventDefault();

    // const inputs = [...document.querySelectorAll('input')].filter(
    //   (input) => input.id !== 'email' && input.id !== 'uid'
    // );

    // const data = {};
    // inputs.forEach((input) => {
    //   data[input.id] = input.value;
    // });
    // console.log(data);
    const currentUserRef = ref(storageRef, `users/${user.uid}/profil.jpg`);
    console.log(currentUserRef);
  };

  const uploadFileHandler = () => {
    // Our application
    const file = document.getElementById('URLpicture').files[0];

    const ObjectURLFile = window.URL.createObjectURL(file);
    setURLpicture(ObjectURLFile);

    // Firebase storage (for upload)
    const currentUserRef = ref(storageRef, `users/${user.uid}/${file.name}`);
    const filename = file.name;

    uploadBytes(currentUserRef, file, filename).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
    });

    console.log(currentUserRef);
  };

  return (
    <div className={styles.ProfilManager}>
      <h1>Bienvenue {username.displayName}</h1>
      <div className={styles.wrapperProfil}>
        <form onSubmit={settingsProfilClickHandler}>
          <label htmlFor='displayName'>
            displayName: &nbsp;
            <input type='text' id='displayName' defaultValue={username.displayName} />
          </label>

          <label htmlFor='email'>
            email: &nbsp;
            <input type='email' id='email' defaultValue={username.email} disabled />
          </label>

          <label htmlFor='URLpicture'>
            Photo de profil: (285 x 285)
            <input type='file' id='URLpicture' onChange={uploadFileHandler} />
          </label>

          <label htmlFor='phoneNumber'>
            Téléphone: &nbsp;
            <input type='text' id='phoneNumber' defaultValue={username.phoneNumber} />
          </label>

          <label htmlFor='uid'>
            UID: &nbsp;
            <input
              type='text'
              id='uid'
              defaultValue={username.uid}
              disabled
              onChange={(e) => setUsername(e.target.value)}
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
