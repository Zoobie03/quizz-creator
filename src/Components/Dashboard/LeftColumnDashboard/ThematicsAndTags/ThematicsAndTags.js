// Library
import React from 'react';
import { useState } from 'react/cjs/react.development';
// Own Files
import styles from './ThematicsAndTags.module.css';

const ThematicsAndTags = ({ title, noneMessage }) => {
  // State
  const [data, setData] = useState([]);

  // Methods
  const handleClick = () => {
    console.log(title + ' clicked');
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
      <ul>{themOrTagsMapped.length > 0 ? themOrTagsMapped : <p>{noneMessage}</p>}</ul>
    </div>
  );
};

export default ThematicsAndTags;
