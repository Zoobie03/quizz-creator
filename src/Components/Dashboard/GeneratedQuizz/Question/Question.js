// Library
import React from 'react';
// Own files
import styles from './Question.module.css';

const Question = (props) => {
  // question, index
  return (
    <li key={props.index} className={styles.Question}>
      <h2>Question {props.index + 1}</h2>
      <p>{props.question.question}</p>
      <label htmlFor={`question${props.index + 1}`}>
        <input type='text' id={`question${props.index + 1}`} />
      </label>
    </li>
  );
};

export default Question;
