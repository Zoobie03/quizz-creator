// Library
import React from 'react';
// Own files
import styles from './Question.module.css';

const Question = (props) => {
  // question, index
  return (
    <li key={props.index} className={styles.QuestionCard}>
      <span className={styles.questionTitle}>Question {props.index + 1}</span>
      <p className={styles.question}>{props.question.question}</p>
      <label htmlFor={`question${props.index + 1}`}>
        <input type='text' id={`question${props.index + 1}`} placeholder='Votre réponse...' />
      </label>
    </li>
  );
};

export default Question;
