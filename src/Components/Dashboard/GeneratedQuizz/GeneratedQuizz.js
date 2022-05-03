// Library
import React from 'react';
// Own files
import styles from './GeneratedQuizz.module.css';
// Component
import Question from './Question/Question';

const GeneratedQuizz = (props) => {
  // quizz.title quizz.questions
  return (
    <div className={styles.GeneratedQuizz}>
      <h1>{props.quizz.title}</h1>
      <ul>
        {props.quizz.questions.map((question, index) => {
          return <Question index={index} question={question} />;
        })}
      </ul>
    </div>
  );
};

export default GeneratedQuizz;
