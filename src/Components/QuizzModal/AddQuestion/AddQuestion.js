// Library
import React from 'react';
// Own files
import logo from '../../../pictures/logo.png';
import styles from './AddQuestion.module.css';

const AddQuestion = () => {
  // State
  const [question, setQuestion] = React.useState([]);

  return (
    <div className={styles.AddQuestion}>
      <div className={styles.Content}>
        <img src={logo} alt='Quizz Creator' width='125px' />
        <div className={styles.QuestionsContainer}>
          <button>Ajouter une question</button>
        </div>
        <button type='button'>Suivant</button>
      </div>
    </div>
  );
};

export default AddQuestion;
