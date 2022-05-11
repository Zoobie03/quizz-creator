// Library
import React from 'react';
// Own files
import styles from './Contact.module.css';

const Contact = () => {
  // State
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [messageInputValue, setMessageInputValue] = React.useState('');

  // Methods
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setNameInputValue(value);
        break;
      case 'email':
        setEmailInputValue(value);
        break;
      case 'message':
        setMessageInputValue(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log('Formulaire soumis');
  };

  return (
    <div className={styles.Contact}>
      <h1>Pour contacter le développeur</h1>
      <form>
        <label htmlFor='name'>
          Nom
          <input id='name' name='name' type='text' value={nameInputValue} onChange={handleChange} />
        </label>
        <label htmlFor='email'>
          E-mail
          <input
            id='email'
            name='email'
            type='mail'
            value={emailInputValue}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='message'>
          Votre message
          <textarea
            id='message'
            name='message'
            rows='10'
            value={messageInputValue}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type='submit' onSubmit={(event) => handleFormSubmit(event)}>
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contact;
