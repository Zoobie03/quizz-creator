// Library
import React from 'react';
import emailjs from '@emailjs/browser';
// Own files
import styles from './Contact.module.css';
import { toast } from 'react-toastify';

const Contact = () => {
  // State
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [messageInputValue, setMessageInputValue] = React.useState('');

  // ComponentDidMount
  React.useEffect(() => {
    resetForm();
  }, []);

  // Methods
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setNameInputValue(value);
        break;
      case 'user_email':
        setEmailInputValue(value);
        break;
      case 'message':
        setMessageInputValue(value);
        break;
      default:
        break;
    }
  };

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm('service_knqt37p', 'template_xq5plr6', event.target, 'FTBR6qMHkQMXUF6fM')
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          toast.success(
            'Message envoyé ! Le développeur vous répondra dans les plus brefs délais.'
          );
        }
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Une erreur est survenue, veuillez réessayer plus tard.', { theme: 'colored' });
      });
  };

  const resetForm = () => {
    setNameInputValue('');
    setEmailInputValue('');
    setMessageInputValue('');
  };

  return (
    <div className={styles.Contact}>
      <h1>Pour contacter le développeur</h1>
      <form onSubmit={(event) => sendEmail(event)}>
        <label htmlFor='name'>
          Nom
          <input id='name' name='name' type='text' value={nameInputValue} onChange={handleChange} />
        </label>
        <label htmlFor='user_email'>
          E-mail
          <input
            id='user_email'
            name='user_email'
            type='email'
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
        <button type='submit'>Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
