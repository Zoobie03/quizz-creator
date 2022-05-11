// Library
import React from 'react';
// Own files
import styles from './Contact.module.css';

const Contact = () => {
  // State

  // Methods
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Formulaire soumis');
  };

  return (
    <div className={styles.Contact}>
      <h1>Pour contacter le développeur</h1>
      <form>
        <label htmlFor='name'>
          Nom
          <input id='name' type='text' />
        </label>
        <label htmlFor='email'>
          E-mail
          <input id='email' type='mail' />
        </label>
        <label htmlFor='message'>
          Votre message
          <textarea id='message' rows='10'></textarea>
        </label>
        <button type='submit' onSubmit={(event) => handleFormSubmit(event)}>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contact;
