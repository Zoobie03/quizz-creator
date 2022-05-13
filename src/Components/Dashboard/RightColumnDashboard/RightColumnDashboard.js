// Library
import React from 'react';
// Own Files
import styles from './RightColumnDashboard.module.css';
// Components
import Panel from './Panel/Panel';

const RightColumnDashboard = (props) => {
  return (
    <div
      className={styles.RightColumnDashboard}
      style={{ visibility: props.quizzIsClicked ? 'visible' : 'hidden' }}
    >
      <h2>Détails du quizz</h2>
      <div className={styles.RightColumnDashboard__content}>
        <Panel panelTitle='Titre du quizz' information={props?.quizz?.title || 'Aucun titre'} />
        <Panel
          panelTitle='Nombre de questions'
          information={props?.quizz?.questions.length || '0'}
        />
        <Panel
          panelTitle='Date de création'
          information={props?.quizz?.createdAt || 'Aucune date'}
        />
      </div>
    </div>
  );
};

export default RightColumnDashboard;
