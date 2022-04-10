// Library
import React, { useState } from 'react';
// Own files
import styles from './QuizzModal.module.css';
import logo from '../../pictures/logo.png';

const QuizzModal = (props) => {
  // States
  const [titleQuizz, setTitleQuizz] = useState('');
  const [thematicValue, setThematicValue] = useState('');
  const [tagValue, setTagValue] = useState('');

  const [thematicsQuizz, setThematicsQuizz] = useState([]);
  const [tagsQuizz, setTagsQuizz] = useState([]);

  // Methods
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
    <div
      className={`${styles.QuizzModal} ${props.modalIsOpen ? styles.animateIn : null}`}
      id='createQuizzModal'
    >
      <div className={styles.ModalContent}>
        <img src={logo} alt='Quizz Creator' width='200px' />
        <form onSubmit={(e) => e.preventDefault()}>
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
          <input
            type='text'
            value={tagValue}
            onChange={(event) => setTagValue(event.target.value)}
          />
        </form>
        <button type='button' onClick={handleButtonClick}>
          Suivant
        </button>
      </div>
      <svg width='2em' height='2em' viewBox='0 0 24 24' onClick={props.onSvgClick}>
        <path
          fill='none'
          stroke='red'
          strokeLinecap='round'
          strokeWidth='2'
          d='M20 20L4 4m16 0L4 20'
        ></path>
      </svg>
    </div>
  );
};

export default QuizzModal;
