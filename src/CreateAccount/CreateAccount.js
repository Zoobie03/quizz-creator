// Librairies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Own files
import { auth, db } from '../config/firebase';
import routes from '../config/routes';
import styles from './CreateAccount.module.css';
import { checkValidity } from '../Shared/utility';
// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
// Components
import Input from '../Components/Input/Input';

const CreateAccount = (props) => {
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
    passwordVerification: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Retapez votre mot de passe',
        autoComplete: 'current-password',
      },
      value: '',
      label: 'Retapez votre mot de passe',
      valid: false,
      validation: {
        required: true,
        samePasswords: false,
        notValidMessage: `Les mots de passes doivent correspondres`,
      },
      touched: false,
    },
  });
  const [emailError, setEmailError] = useState(false);
  const [valid, setValid] = useState(false);

  // Functions
  const registerClickHandler = () => {
    const user = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;

        const usersCollection = doc(db, 'users', user.uid);

        setDoc(usersCollection, { quizzs: [] });

        props.history.push(routes.DASHBOARD);
      })
      .catch((error) => {
        // Adresse email en doublon
        switch (error.code) {
          case 'auth/email-already-in-use':
            setEmailError(true);
            break;
          default:
            break;
        }
      });
  };

  const formHandler = (event) => {
    event.preventDefault();
  };

  const inputChangeHandler = (event, elementId) => {
    // Change la valeur
    const newInputs = { ...inputs };
    newInputs[elementId].value = event.target.value;
    newInputs[elementId].touched = true;

    // Vérification de la valeur
    newInputs[elementId].valid = checkValidity(event.target.value, newInputs[elementId].validation);

    // Les champs mot de passe doivent correspondre
    if (newInputs[elementId] === newInputs['passwordVerification']) {
      const currentPassword = newInputs['password'];
      const verificationPassword = newInputs['passwordVerification'];

      currentPassword.value === verificationPassword.value
        ? (verificationPassword.valid = true)
        : (verificationPassword.valid = false);
    }

    setInputs(newInputs);

    // Vérification du formulaire
    let formIsValid = true;

    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }

    setValid(formIsValid);
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
        <button onClick={registerClickHandler} disabled={!valid} className={styles.button}>
          Inscription
        </button>
      </div>
      <div className={styles.noAccount}>
        <span>
          Vous avez déja un compte ? &nbsp;
          <Link to={routes.AUTHENTIFICATION}>Connectez-vous</Link>
        </span>
      </div>
    </form>
  );

  return (
    <>
      <h1>Créer un compte</h1>
      <div className={styles.form}>
        {form}
        {emailError ? (
          <div className={styles.alert}>Cette adresse email est déja utilisée.</div>
        ) : null}
      </div>
    </>
  );
};

export default CreateAccount;
