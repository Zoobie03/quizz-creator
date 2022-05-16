// Library
import React, { useContext } from 'react';
// Own files
import { LoginContext } from '../../hoc/Contexts/LoginContext';
import styles from './Home.module.css';
import PROFILE from '../../pictures/profile_quizz_creator.jpg';
import QUIZZCARD from '../../pictures/quizzcard.png';

const Home = () => {
  const { user } = useContext(LoginContext);

  return (
    <>
      {user ? (
        <div className={styles.Home}>
          <h1>Quizz Creator</h1>
        </div>
      ) : (
        <div className={styles.Home}>
          <h1>Quizz Creator</h1>
        </div>
      )}
    </>
  );
};

export default Home;
