// Library
import React from 'react';
// Own Files
import useAuth from '../../../../customHook/useAuth';
import styles from './UserPicture.module.css';
import DefaultPicture from '../../../../pictures/defaultPicture.png';

const UserPicture = () => {
  const currentUser = useAuth();

  return (
    <div className={styles.UserPicture}>
      {currentUser?.photoURL ? (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img src={currentUser?.photoURL} alt='Image de profil' className={styles.profilPicture} />
      ) : (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img src={DefaultPicture} alt='Image de profil' className={styles.profilPicture} />
      )}
    </div>
  );
};

export default UserPicture;
