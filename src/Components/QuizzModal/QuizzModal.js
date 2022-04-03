// Library
import React from 'react';
// Own files
import styles from './QuizzModal.module.css';
import logo from '../../pictures/logo.png';

const QuizzModal = (props) => {
  return (
    <div
      className={`${styles.QuizzModal} ${props.modalIsOpen ? styles.animateIn : null}`}
      id='createQuizzModal'
    >
      <div className={styles.ModalContent}>
        <img src={logo} alt='Quizz Creator' width='200px' />
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Titre de votre Quizz</label>
          <input type='text' />

          <label>Thématiques de votre Quizz (optionnel)</label>
          <input type='text' />

          <label>Tags de votre Quizz (optionnel)</label>
          <input type='text' />
        </form>
        <button type='submit'>Suivant</button>
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
