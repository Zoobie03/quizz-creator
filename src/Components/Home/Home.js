import React, { useContext } from 'react';
import { LoginContext } from '../../hoc/Contexts/LoginContext';

const Home = () => {
  const { user } = useContext(LoginContext);

  return (
    <>
      {user ? (
        <div>
          <h1>Bienvenue sur Quizz-creator</h1>

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

          <p>Allez dans l'onglet se connecter, et cliquez sur créer un compte</p>
        </div>
      )}
    </>
  );
};

export default Home;
