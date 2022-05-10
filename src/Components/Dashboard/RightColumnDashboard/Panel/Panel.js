// Library
import React from 'react';
// Own files
import styles from './Panel.module.css';

const Panel = (props) => {
  // PanelTitle, quizz.questions
  return (
    <div className={styles.Panel}>
      <h3>{props.PanelTitle || 'Titre générique'}</h3>
      <p>{props?.quizz?.questions.length || 'Aucune donnée reçu en props'}</p>
    </div>
  );
};

export default Panel;
