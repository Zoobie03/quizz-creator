// Library
import React from 'react';
// Own Files
import styles from './NoMatch.module.css';

const NoMatch = () => {
  return (
    <div className={styles.NoMatch}>
      <h1>404</h1>
      <span>Page introuvable</span>
    </div>
  );
};

export default NoMatch;
