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
          <div className={styles.Home_Content}>
            <div className={styles.leftColumn}>
              <h2>Bienvenue à toi !</h2>
              <p>
                Avant de commencer, pense a vérifier ton e-mail et a entrer un pseudonyme dans
                l'onglet <i>Mon profil</i>. Tu peux aussi t'attribué une image de profil.
              </p>
              <hr />
              <h2>Par où commencer ?</h2>
              <p>
                Rendez-vous dans l'onglet <i>Dashboard</i> pour créer votre premier quizz.
              </p>
            </div>
            <div className={styles.rightColumn}></div>
          </div>
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
