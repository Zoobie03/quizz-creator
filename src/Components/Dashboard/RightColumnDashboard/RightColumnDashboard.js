// Library
import React from 'react';
// Own Files
import styles from './RightColumnDashboard.module.css';

const RightColumnDashboard = (props) => {
  return (
    <div
      className={styles.RightColumnDashboard}
      style={{ display: props.quizzIsClicked ? 'block' : 'none' }}
    >
      <h2>Détails du quizz</h2>
    </div>
  );
};

export default RightColumnDashboard;
