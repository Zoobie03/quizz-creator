// Library
import React from 'react';
// Own files
import styles from './GeneratedQuizz.module.css';
// Component
import Question from './Question/Question';

const GeneratedQuizz = (props) => {
  // quizzTitle, quizzQuestions
  return (
    <div className={styles.GeneratedQuizz}>
      <h1>{props.quizzTitle}</h1>
      <ul>
        {props.quizzQuestions.map((question, index) => {
          return <Question index={index} question={question} />;
        })}
      </ul>
    </div>
  );
};

export default GeneratedQuizz;
