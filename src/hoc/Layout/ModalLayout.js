// Library
import React from 'react';
// Own files
import logo from '../../pictures/logo.png';
import styles from './ModalLayout.module.css';

const ModalLayout = (props) => {
  return (
    <div className={`${styles.ContainerModal} ${props.modalIsOpen ? styles.animateIn : null}`}>
      <div className={styles.ModalContent}>
        <svg
          className={styles.CloseModal}
          width='2em'
          height='2em'
          viewBox='0 0 24 24'
          onClick={props.onSvgClick}
        >
          <path
            fill='none'
            stroke='red'
            strokeLinecap='round'
            strokeWidth='2'
            d='M20 20L4 4m16 0L4 20'
          ></path>
        </svg>
        <img src={logo} alt='Quizz creator écrit dans un rond de couleur bleu violet' />
        {props.children}
      </div>
    </div>
  );
};

export default ModalLayout;
