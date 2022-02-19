import React, { useContext, useState } from "react";
import styles from './ProfilManager.module.css';
import { getDoc, doc, db } from '../../config/firebase';
import { LoginContext } from '../../hoc/Contexts/LoginContext';

const ProfilManager = (props) => {
  
  // Context
  const { user } = useContext(LoginContext);

  // State
  const [username, setUsername] = useState({...user});
  const { displayName, email, emailVerified, phoneNumber, photoURL, quizzs, uid } = user;

  const settingsProfilClickHandler = () => {
    
  }

  return (
    <div>
      <h1>{user.displayName} ici tu pourra rentré les informations te concernant</h1>
      <div className={styles.wrapperProfil}>
        <form onSubmit={(e) => e.preventDefault()}>

          <label>displayName: &nbsp;
            <input type='text' defaultValue={username.displayName} />
          </label>

          <label>email: &nbsp;
            <input type='email' defaultValue={username.email} />
          </label>

          <label>Photo de profil: &nbsp;
            <input type='file' defaultValue={username.photoURL} />
          </label>

          <label>Téléphone: &nbsp;
            <input type='text' defaultValue={username.phoneNumber} />
          </label>

          <label>UID: &nbsp;
            <input type='text' defaultValue={username.uid} onChange={(e) => setUsername(e.target.value)} />
          </label>

          <button type="submit" onClick={settingsProfilClickHandler}>Valider les changements</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilManager;
