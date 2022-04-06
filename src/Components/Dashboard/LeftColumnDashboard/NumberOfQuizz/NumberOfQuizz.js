// Library
import React from 'react';
// Own files
import styles from './NumberOfQuizz.module.css';

const NumberOfQuizz = ({ numberOfQuizz }) => {
  return (
    <div className={styles.NumberOfQuizz}>
      <h2>Nombre de quizz</h2>
      <p>{numberOfQuizz}</p>
    </div>
  );
};

export default NumberOfQuizz;
