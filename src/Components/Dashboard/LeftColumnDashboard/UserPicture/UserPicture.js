// Library
import React from 'react';
// Own Files
import useAuth from '../../../../customHook/useAuth';
import styles from './UserPicture.module.css';

const UserPicture = () => {
  const currentUser = useAuth();

  return (
    <div className={styles.UserPicture}>
      {currentUser?.photoURL ? (
        <img src={currentUser?.photoURL} alt='Image de profil' className={styles.profilPicture} />
      ) : null}
    </div>
  );
};

export default UserPicture;
