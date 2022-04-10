// Library
import React, { useState } from 'react';
// Own files
import styles from './QuizzModal.module.css';
// Components
import CreateQuizz from './CreateQuizz/CreateQuizz';
import AddQuestion from './AddQuestion/AddQuestion';
//Hoc
import ModalLayout from '../../hoc/Layout/ModalLayout';

const QuizzModal = (props) => {
  // State
  const [modalActiveTab, setModalActiveTab] = useState(0);
  const [modalTabs, setModalTabs] = useState([<CreateQuizz />, <AddQuestion />]);

  return (
    <ModalLayout modalIsOpen={props.modalIsOpen} onSvgClick={props.onSvgClick}>
      {modalTabs[modalActiveTab]}
      <button>Suivant</button>
    </ModalLayout>
  );
};

export default QuizzModal;
