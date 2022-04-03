import React from 'react';
import styles from './QuizzModal.module.css';

const QuizzModal = (props) => {
  return (
    <div
      className={`${styles.QuizzModal} ${props.modalIsOpen ? styles.animateIn : null}`}
      id='createQuizzModal'
    >
      <div className={styles.ModalContent}>
        <h1>Create Quizz</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam doloremque, quidem,
          quisquam doloremque.
        </p>
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
