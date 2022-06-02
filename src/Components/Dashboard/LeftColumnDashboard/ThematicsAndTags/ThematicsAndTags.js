// Library
import React from 'react';
// Own Files
import styles from './ThematicsAndTags.module.css';

const ThematicsAndTags = ({ title, noneMessage, data }) => {
  // Methods
  const handleClick = () => {
    // console.log(title + ' clicked');
  };

  const themOrTagsMapped = data.map((thematicOrTag, index) => {
    return (
      <li key={index} onClick={handleClick}>
        {thematicOrTag}
      </li>
    );
  });

  return (
    <div className={styles.ThematicsAndTags}>
      <h2>{title}</h2>
      {themOrTagsMapped.length > 0 ? <ul>{themOrTagsMapped}</ul> : <p>{noneMessage}</p>}
    </div>
  );
};

export default ThematicsAndTags;
