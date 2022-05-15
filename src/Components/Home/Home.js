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
          <div className={styles.welcome}>
            <h2>
              <u>Bienvenue à toi, avant de commencer complète ton profil</u>
            </h2>
            <span>
              Tous ceci n'est évidemment <b>pas obligatoire</b>
            </span>
            <ul>
              <li>
                <h3>Entrer un pseudonyme</h3>
                <p>
                  Nous avons tous ou presque un pseudonyme sur internet, n'hésite pas rentrer le
                  tiens
                </p>
                <p>Aller dans l'onglet "Mon Profil", puis saissisez votre pseudonyme.</p>
              </li>
              <li>
                <h3>Ajouter une photo de profil</h3>
                <p>Tu peux aussi t'ajouter une photo de profil, dans l'onglet "Mon Profil".</p>
              </li>
              <li>
                <h3>Vérifier ton adresse e-mail</h3>
                <p>
                  En cliquant sur le bouton "M'enovyer un email de vérification" dans l'onglet "Mon
                  Profil" sela te permet de pouvoir profiter du site pleinement sans aucun risque de
                  banissement
                </p>
              </li>
            </ul>

            <hr />

            <h2>
              <u>Comment créer un quizz</u>
            </h2>
            <ul>
              <li>
                <h3>Rendez-vous dans la section "Dashboard"</h3>
                <p>
                  Tu pourras ensuite cliquer sur l'icône " + " pour ouvrir le formulaire de création
                  d'un quizz pour te créer ta première QuizzCard. Tu pourras lui attribuer une image
                  si tu le souhaites.
                </p>
              </li>
              <li>
                <h3>Comment ajouter des question à mon quizz</h3>
                <p>
                  Je vais te présenter les petites icônes que tu pourras voir sur toute tes
                  QuizzCard
                </p>
              </li>
              <li>
                <h3></h3>
              </li>
            </ul>
          </div>
          <div className={styles.welcomeRightPicture}>
            <img src='https://picsum.photos/750/400' alt='example of a profile page' />

            <img src='https://picsum.photos/750/400' alt='example of a quizzcard' />
          </div>
        </div>
      ) : (
        <div>
          <h1>Bienvenue sur Quizz-creator</h1>

          <h3>
            <u>Commencez par créer votre compte</u>
          </h3>

          <p>Allez dans l'onglet se connecter, puis cliquez sur créer un compte</p>
        </div>
      )}
    </>
  );
};

export default Home;
