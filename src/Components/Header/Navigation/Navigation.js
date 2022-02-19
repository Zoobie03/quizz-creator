// Librairies
import React, { useContext } from 'react';
import routes from '../../../config/routes';
import styles from "./Navigation.module.css";
import { LoginContext } from '../../../hoc/Contexts/LoginContext';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { auth } from '../../../config/firebase';

// Components
import NavigationItem from './NavigationItem/NavigationItem';

const Navigation = (props) => {

  // Context
  const { user } = useContext(LoginContext);

  // Méthode
  const logoutClickedHandler = () => {
    auth.signOut();
    // J'ai du mettre withRouter a la fin du composant pour accéder a props.history
    props.history.push(routes.HOME);
  }

  return (
    <ul className={styles.Navigation}> 
      <NavigationItem to={routes.HOME}>Accueil</NavigationItem>
      {user ? <NavigationItem exact to={routes.DASHBOARD}>Dashboard</NavigationItem> : null}
      {user ? <NavigationItem exact to={routes.MY_PROFIL}>Mon profil</NavigationItem> : null}
      <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
      {!user ? <NavigationItem exact to={routes.AUTHENTIFICATION}>Se connecter</NavigationItem> : null}
      {user ? <button onClick={logoutClickedHandler} className={styles.logout} >Déconnexion</button> : null}
    </ul>
  );
};

export default withRouter(Navigation);
