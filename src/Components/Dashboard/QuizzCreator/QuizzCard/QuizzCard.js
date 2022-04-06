// LIbrary
import React from 'react';
// Own Files
import styles from './QuizzCard.module.css';

const QuizzCard = (props) => {
  return (
    <div className={styles.QuizzCard}>
      <li key={props.key}>
        <span onClick={props.onClick}>suprrimer Quizz n {props.index}</span>
      </li>
      <span className={styles.quizzTitle}>{props.quizzTitle}</span>
    </div>
  );
};

export default QuizzCard;
