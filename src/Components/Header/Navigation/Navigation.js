// Librairies
import React, { useContext } from 'react';
import routes from '../../../config/routes';
import styles from './Navigation.module.css';
import { LoginContext } from '../../../hoc/Contexts/LoginContext';
import { auth } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
// Components
import NavigationItem from './NavigationItem/NavigationItem';

const Navigation = () => {
  // Variable
  const history = useNavigate;
  // Context
  const { user } = useContext(LoginContext);

  // Méthode
  const logoutClickedHandler = () => {
    auth.signOut();
    history.push(routes.HOME);
  };

  return (
    <ul className={styles.Navigation}>
      <NavigationItem to={routes.HOME}>Accueil</NavigationItem>
      {user ? (
        <NavigationItem end to={routes.DASHBOARD}>
          Dashboard
        </NavigationItem>
      ) : null}
      {user ? (
        <NavigationItem end to={routes.MY_PROFIL}>
          Mon profil
        </NavigationItem>
      ) : null}
      <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
      {!user ? (
        <NavigationItem end to={routes.AUTHENTIFICATION}>
          Se connecter
        </NavigationItem>
      ) : null}
      {user ? (
        <button onClick={logoutClickedHandler} className={styles.logout}>
          Déconnexion
        </button>
      ) : null}
    </ul>
  );
};

export default Navigation;
