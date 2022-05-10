// Librairies
import React from 'react';
// Own files
import styles from './QuizzCreator.module.css';
// Components
import QuizzModal from '../QuizzModal/QuizzModal';

const QuizzCreator = (props) => {
  return (
    <div className={styles.QuizzCreator} onClick={(event) => props.onMainContainerClick(event)}>
      <h1>{props.user.displayName ? 'Dashboard de ' + props.user.displayName : 'Dashboard'}</h1>
      <ul className={styles.wrapperQuizzs}>
        {props.quizzsMapped.length > 0 ? props.quizzsMapped : <h2>Vous n'avez aucun Quizz</h2>}

        <div onClick={props.addQuizzClickHandler} className={styles.svgContainer}>
          <svg width='150px' height='150px' viewBox='0 0 24 24'>
            <path
              d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'
              fill='#71eb4d'
            ></path>
          </svg>
          <span>Créer un quizz</span>
        </div>
      </ul>
      {props.modalIsOpen ? (
        <QuizzModal
          userQuizzs={props.userQuizzs}
          modalIsOpen={props.modalIsOpen}
          onSvgClick={props.onSvgClickHandler}
          quizz={props.quizz}
          setQuizz={props.setQuizz}
          handleCreateQuizzClick={props.handleCreateQuizzClick}
        />
      ) : null}
    </div>
  );
};

export default QuizzCreator;
