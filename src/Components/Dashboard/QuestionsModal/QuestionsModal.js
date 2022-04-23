// Library
import React from 'react';
// Own files
import styles from './QuestionsModal.module.css';

const QuestionsModal = (props) => {
  return (
    <div
      className={`${styles.ContainerModal} ${props.questionModalIsOpen ? styles.animateIn : null}`}
    >
      <div className={styles.ModalContent}>
        <h2>Editer un quizz</h2>
      </div>
    </div>
  );
};

export default QuestionsModal;
