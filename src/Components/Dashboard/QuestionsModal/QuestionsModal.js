// Library
import React from 'react';
// Own files
import styles from './QuestionsModal.module.css';

const QuestionsModal = (props) => {
  // Variables
  const closedCross = (
    <svg
      width='2em'
      height='2em'
      viewBox='0 0 72 72'
      className={styles.CloseModal}
      onClick={props.onSvgClickOnQuestionModal}
    >
      <path
        fill='#ea5a47'
        d='m58.14 21.78l-7.76-8.013l-14.29 14.22l-14.22-14.22l-8.013 8.013L28.217 36l-14.36 14.22l8.014 8.013l14.22-14.22l14.29 14.22l7.76-8.013L43.921 36z'
      ></path>
      <path
        fill='none'
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        d='m58.14 21.78l-7.76-8.013l-14.29 14.22l-14.22-14.22l-8.013 8.013L28.207 36l-14.35 14.22l8.014 8.013l14.22-14.22l14.29 14.22l7.76-8.013L43.921 36z'
      ></path>
    </svg>
  );

  return (
    <div
      className={`${styles.ContainerModal} ${props.questionModalIsOpen ? styles.animateIn : null}`}
    >
      {closedCross}
      <div className={styles.ModalContent}>
        <h2>Editer un quizz</h2>
      </div>
    </div>
  );
};

export default QuestionsModal;
