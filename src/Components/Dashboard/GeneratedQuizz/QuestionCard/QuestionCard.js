// Library
import React from 'react';
// Own files
import styles from './QuestionCard.module.css';

const Question = (props) => {
  // question, index
  return (
    <li
      key={props.index}
      style={{
        border: `3px solid ${props.questionBorderColor}`,
        backgroundColor: props.questionBorderColor,
        borderRadius: props.questionBorderRadius,
      }}
      className={`${styles.QuestionCard} ${props.className}`}
    >
      <span className={styles.questionIndex}>Question {props.index + 1}</span>

      <p
        className={styles.question}
        style={{
          backgroundColor: props.questionBackgroundColor,
        }}
      >
        {props.question.question}
      </p>

      {props?.picture ? (
        <img
          src={props.picture}
          className={styles.questionPicture}
          alt={`question ${props.index}`}
        />
      ) : null}

      <input
        type='text'
        id={`answerQuestion--${props.index + 1}`}
        className={styles.answerInput}
        placeholder='Votre réponse...'
      />
    </li>
  );
};

export default Question;
