// LIbrary
import React from 'react';
// Own Files
import styles from './QuizzCard.module.css';

const QuizzCard = (props) => {
  return (
    <li className={styles.QuizzCard}>
      <div className={styles.quizzPicture}>
        <span onClick={props.onClick}>suprrimer Quizz n {props.index}</span>
      </div>
      <span className={styles.quizzTitle}>{props.quizzTitle}</span>
    </li>
  );
};

export default QuizzCard;
