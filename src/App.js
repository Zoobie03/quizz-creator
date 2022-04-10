// Librairies
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// Own files
import routes from './config/routes';
import './App.css';
import { auth } from './config/firebase';

// HOC
import { LoginContext } from './hoc/Contexts/LoginContext';
import Layout from './hoc/Layout/Layout';

// Components
import Authentification from './Security/Authentification/Authentification';
import Contact from './Components/Contact/Contact';
import Home from './Components/Home/Home';
import ProfilManager from './Components/ProfilManager/ProfilManager';
import CreateAccount from './CreateAccount/CreateAccount';
import Dashboard from './Components/Dashboard/Dashboard';
import AddQuestion from './Components/QuizzModal/AddQuestion/AddQuestion';

const App = () => {
  // State
  const [user, setUser] = useState('');

  // ComponentDidMount
  useEffect(() => {
    authListener();
  }, []);

  // Méthodes
  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Connexion
        const { displayName, email, emailVerified, phoneNumber, photoURL, uid } = { ...user };
        setUser({
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
        });
      } else {
        // Déconnexion
        setUser('');
      }
    });
  };

  return (
    <div className='App'>
      <LoginContext.Provider value={{ user }}>
        <Layout>
          <Switch>
            <Route path={routes.HOME} exact component={Home} />
            <Route path={routes.DASHBOARD} exact component={Dashboard} />
            <Route path={routes.AUTHENTIFICATION} exact component={Authentification} />
            <Route path={routes.CONTACT} exact component={Contact} />
            <Route path={routes.MY_PROFIL} exact component={ProfilManager} />
            <Route path={routes.CREATE_ACCOUNT} exact component={CreateAccount} />
            <Route path={'/test'} exact component={AddQuestion} />
          </Switch>
        </Layout>
      </LoginContext.Provider>
    </div>
  );
};

export default App;
