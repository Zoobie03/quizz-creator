// Library
import React from 'react';
// Own files
import styles from './GeneratedQuizz.module.css';

const GeneratedQuizz = (props) => {
  // quizzTitle, quizzQuestions
  return (
    <div className={styles.GeneratedQuizz}>
      <h1>{props.quizzTitle}</h1>
      {props.quizzQuestions.map((question, index) => {
        return (
          <div key={index} className={styles.question}>
            <h2>Question {index + 1}</h2>
            <p>{question.question}</p>
            <label htmlFor={`question${index + 1}`}>
              <input type='text' id={`question${index + 1}`} />
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default GeneratedQuizz;
