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
        <Panel />
        <Panel />
        <Panel />
        <Panel />
      </div>
    </div>
  );
};

export default RightColumnDashboard;
