// Library
import React from 'react';
// Own files
import styles from './ModalLayout.module.css';

const ModalLayout = (props) => {
  return (
    <div className={`${styles.ContainerModal} ${props.modalIsOpen ? styles.animateIn : null}`}>
      <div className={styles.ModalContent}>
        <h2>{props.titleModal}</h2>
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

        {props.children}
      </div>
    </div>
  );
};

export default ModalLayout;
