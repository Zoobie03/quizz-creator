import React, { useContext } from 'react';
import { LoginContext } from '../../hoc/Contexts/LoginContext';
import styles from './Home.module.css';

const Home = () => {
  const { user } = useContext(LoginContext);

  return (
    <>
      {user ? (
        <div className={styles.Home}>
          <h1>Bienvenue sur Quizz-creator</h1>

          <h2>
            <u>Pour entrer un pseudonyme</u>
          </h2>
          <p>Aller dans l'onglet "Mon Profil", puis saissisez votre pseudonyme.</p>
          <p>Sachez que vous pouvez aussi vous attribuer une photo de profil</p>

          <h2>
            <u>Pour créer votre premier quizz</u>
          </h2>

          <p>Allez dans l'onglet "Dashboard", et le cliquez sur le +</p>
        </div>
      ) : (
        <div>
          <h1>Bienvenue sur Quizz-creator</h1>

          <h2>
            <u>Commencez par créer votre compte</u>
          </h2>

          <p>Allez dans l'onglet se connecter, puis cliquez sur créer un compte</p>
        </div>
      )}
    </>
  );
};

export default Home;
