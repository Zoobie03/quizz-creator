// Library
import React from 'react';
// Own Files
import useAuth from '../../../../customHook/useAuth';
import styles from './UserPicture.module.css';
// Components
import NumberOfQuizz from '../NumberOfQuizz/NumberOfQuizz';
import ThematicsAndTags from '../ThematicsAndTags/ThematicsAndTags';

const UserPicture = () => {
  const currentUser = useAuth();

  return (
    <div className={styles.UserPicture}>
      {currentUser?.photoURL ? (
        <img
          src={currentUser?.photoURL}
          alt='URLpicture of userProfil'
          className={styles.profilPicture}
        />
      ) : null}
    </div>
  );
};

export default UserPicture;
