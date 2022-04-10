// Library
import React from 'react';
// Own files
import logo from '../../../pictures/logo.png';
import styles from './AddQuestion.module.css';

const AddQuestion = () => {
  return (
    <div className={styles.AddQuestion}>
      <div className={styles.Content}>
        <img src={logo} alt='Quizz Creator' width='200px' />
      </div>
    </div>
  );
};

export default AddQuestion;
