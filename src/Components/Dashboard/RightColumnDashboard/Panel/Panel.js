// Library
import React from 'react';
// Own files
import styles from './Panel.module.css';

const Panel = (props) => {
  return (
    <div className={styles.Panel}>
      <h3>{props.panelTitle || 'Titre générique'}</h3>
      <p>{props.information || 'Aucune donnée reçu en props'}</p>
    </div>
  );
};

export default Panel;
