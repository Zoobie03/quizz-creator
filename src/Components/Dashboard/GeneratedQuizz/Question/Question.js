// Library
import React from 'react';
// Own files
import styles from './Question.module.css';

const Question = (props) => {
  // question, index
  return (
    <li
      key={props.index}
      className={styles.QuestionCard}
      style={{
        border: `1px solid ${props.questionBorderColor}`,
      }}
    >
      <span className={styles.questionTitle}>Question {props.index + 1}</span>
      {/* <label htmlFor={`question${props.index + 1}`}> </label> */}
      <p className={styles.question}>{props.question.question}</p>
      <input
        type='text'
        id={`question${props.index + 1}`}
        className={styles.answerInput}
        placeholder='Votre réponse...'
      />
    </li>
  );
};

export default Question;
