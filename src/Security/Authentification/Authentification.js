// Librairies
import React, { useContext, useState } from 'react';
import styles from './Authentification.module.css';
import { checkValidity } from '../../Shared/utility';
import routes from '../../config/routes';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Hoc
import { LoginContext } from '../../hoc/Contexts/LoginContext';

// Components
import Input from '../../Components/Input/Input';
import { Link } from 'react-router-dom';

const Authentification = (props) => {
  // Context
  const { user } = useContext(LoginContext);

  // State
  const [inputs, setInputs] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
        autoComplete: 'username',
      },
      value: '',
      label: 'Adresse email',
      valid: false,
      validation: {
        required: true,
        email: true,
        notValidMessage: `L'adresse e-mail n'est pas valide.`,
      },
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Mot de passe',
        autoComplete: 'current-password',
      },
      value: '',
      label: 'Mot de passe',
      valid: false,
      validation: {
        required: true,
        minLength: 6,
        notValidMessage: `Le mot de passe doit faire au moins 6 caractères.`,
      },
      touched: false,
    },
  });
  const [valid, setValid] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Méthodes
  const inputChangeHandler = (event, elementId) => {
    // Change la valeur
    const newInputs = { ...inputs };
    newInputs[elementId].value = event.target.value;
    newInputs[elementId].touched = true;

    // Vérification de la valeur
    newInputs[elementId].valid = checkValidity(
      event.target.value,
      newInputs[elementId].validation
    );

    setInputs(newInputs);

    // Vérification du formulaire
    let formIsValid = true;

    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }

    setValid(formIsValid);
  };

  const formHandler = (event) => {
    event.preventDefault();
  };

  const logInClickHandler = () => {
    const user = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        props.history.push(routes.HOME);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setLoginError(true);
            break;
          default:
        }
      });
  };

  // Variables
  const formElementsArray = [];
  // Transforme notre objet en tableau
  for (let key in inputs) {
    formElementsArray.push({
      id: key,
      config: inputs[key],
    });
  }

  let form = (
    <form onSubmit={(event) => formHandler(event)}>
      {formElementsArray.map((element) => (
        <Input
          key={element.id}
          id={element.id}
          value={element.config.value}
          label={element.config.label}
          type={element.config.elementType}
          config={element.config.elementConfig}
          autocomplete={element.config.elementConfig.autocomplete}
          valid={element.config.valid}
          touched={element.config.touched}
          invalidMesssage={element.config.validation.notValidMessage}
          changed={(event) => inputChangeHandler(event, element.id)}
        />
      ))}
      <div className={styles.buttons}>
        <button
          onClick={logInClickHandler}
          disabled={!valid}
          className={styles.button}
        >
          Connexion
        </button>
      </div>
      <div className={styles.noAccount}>
        <span>
          Vous n'avez pas de compte ? &nbsp;
          <Link to={routes.CREATE_ACCOUNT}>Créer un compte</Link>
        </span>
      </div>
    </form>
  );

  return (
    <>
      <h1>Se connecter</h1>
      <div className={styles.form}>
        {loginError ? (
          <div className={styles.alert}>Impossible de vous authentifier.</div>
        ) : null}
        {form}
      </div>
    </>
  );
};

export default Authentification;
