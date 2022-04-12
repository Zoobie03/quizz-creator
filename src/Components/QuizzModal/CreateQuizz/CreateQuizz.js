// Library
import React, { useState, useContext } from 'react';
// Own files
import styles from './CreateQuizz.module.css';
import { QuizzContext } from '../../../hoc/Contexts/QuizzContext';

const CreateQuizz = (props) => {
  // Context
  const { quizz, setQuizz } = useContext(QuizzContext);

  // States
  const [titleQuizz, setTitleQuizz] = useState('');
  const [thematicValue, setThematicValue] = useState('');
  const [tagValue, setTagValue] = useState('');

  const [thematicsQuizz, setThematicsQuizz] = useState([]);
  const [tagsQuizz, setTagsQuizz] = useState([]);

  // Methods
  // Trim the spaces in the string and split it by comma
  // Then update the state
  const handleButtonClick = () => {
    const cutThematicValue = thematicValue.replace(/\s+/g, '').split(',');
    const cutTagValue = tagValue.replace(/\s+/g, '').split(',');

    setThematicsQuizz(cutThematicValue);
    setTagsQuizz(cutTagValue);

    const quizz = {
      id: Math.random(),
      title: titleQuizz,
      thematics: thematicsQuizz,
      tags: tagsQuizz,
    };

    setQuizz(quizz);
  };

  // Variables
  const svgInformations = (
    <div
      title='Pour associer plusieurs tags ou thématiques, séparés les par une virgule. Exemple (Jeux Vidéos, Informatique, ...) '
      className={styles.svgInformations}
    >
      <svg width='1em' height='1em' viewBox='0 0 512 512'>
        <path
          d='M480 253C478.3 129.3 376.7 30.4 253 32S30.4 135.3 32 259c1.7 123.7 103.3 222.6 227 221 123.7-1.7 222.7-103.3 221-227zM256 111.9c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM300 395h-88v-11h22V224h-22v-12h66v172h22v11z'
          fill='#888888'
        ></path>
      </svg>
    </div>
  );

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.ModalForm}>
      <label>Titre de votre Quizz</label>
      <input
        type='text'
        value={titleQuizz}
        onChange={(event) => setTitleQuizz(event.target.value)}
      />

      <label>Thématiques de votre Quizz (optionnel) {svgInformations}</label>
      <input
        type='text'
        value={thematicValue}
        onChange={(event) => setThematicValue(event.target.value)}
      />

      <label>Tags de votre Quizz (optionnel) {svgInformations}</label>
      <input type='text' value={tagValue} onChange={(event) => setTagValue(event.target.value)} />
    </form>
  );
};

export default CreateQuizz;
