// Library
import React from 'react';
// Own files
import logo from '../../pictures/logo.png';
import styles from './ModalLayout.module.css';

const ModalLayout = ({ children }) => {
  return (
    <div className={styles.ContainerModal}>
      <div className={styles.ModalContent}>
        <img src={logo} alt='Quizz creator écrit dans un rond de couleur bleu violet' />
        {children}
        <button type='button'>Suivant</button>
      </div>
    </div>
  );
};

export default ModalLayout;
