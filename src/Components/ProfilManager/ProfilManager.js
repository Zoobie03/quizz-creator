import React, { useContext, useState } from 'react';
import styles from './ProfilManager.module.css';
import { LoginContext } from '../../hoc/Contexts/LoginContext';

const ProfilManager = (props) => {
  // Context
  const { user } = useContext(LoginContext);

  // State
  const [username, setUsername] = useState({ ...user });

  const settingsProfilClickHandler = (event) => {
    event.preventDefault();
  };

  const uploadFileHandler = () => {
    const file = document.getElementById('URLpicture').files[0];
    const previewTarget = document.getElementById('picturePreview');

    previewTarget.src = window.URL.createObjectURL(file);
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('username', username);
    // fetch('http://localhost:8080/upload', {
    //   method: 'POST',
    //   body: formData,
    // });
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
            <input
              type='file'
              id='URLpicture'
              defaultValue={username.photoURL}
              onChange={uploadFileHandler}
            />
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
          <img alt='Preview' id='picturePreview' />
        </div>
      </div>
    </div>
  );
};

export default ProfilManager;
