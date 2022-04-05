import React from 'react';
import { useState } from 'react/cjs/react.development';

const ThematicsAndTags = ({ title, noneMessage }) => {
  // State
  const [thematicOrTags, setThematicsOrTags] = useState([]);

  // Methods
  const handleClick = () => {
    console.log('Thematic clicked');
  };

  const themOrTagsMapped = thematicOrTags.map((thematicOrTag, index) => {
    return (
      <li key={index} onClick={handleClick}>
        {thematicOrTag}
      </li>
    );
  });

  return (
    <div>
      <h2>{title}</h2>
      <ul>{themOrTagsMapped.length > 0 ? themOrTagsMapped : <p>{noneMessage}</p>}</ul>
    </div>
  );
};

export default ThematicsAndTags;
