// Library
import React, { useState } from 'react';
// Own files
import styles from './QuizzModal.module.css';
// Components
import CreateQuizz from './CreateQuizz/CreateQuizz';
import AddQuestion from './AddQuestion/AddQuestion';
//Hoc
import ModalLayout from '../../hoc/Layout/ModalLayout';
import QuestionAndAnswers from './AddQuestion/QuestionAndAnswers/QuestionAndAnswers';

const QuizzModal = (props) => {
  // State
  const [modalActiveTab, setModalActiveTab] = useState(0);

  // Methods
  const nextTabClickHandler = () => {
    if (modalActiveTab < modalTabs.length - 1) {
      setModalActiveTab(modalActiveTab + 1);
    }
  };

  const previousTabClickHandler = () => {
    if (modalActiveTab > 0) {
      setModalActiveTab(modalActiveTab - 1);
    }
  };

  const handleTitleModal = (modalActiveTab) => {
    switch (modalActiveTab) {
      case 0:
        return 'Créer un quizz';
      case 1:
        return 'Liste des questions';
      case 2:
        return 'Créer une question';
      default:
        return;
    }
  };

  // Variables
  const modalTabs = [
    <CreateQuizz />,
    <AddQuestion handleAddQuestionClick={nextTabClickHandler} />,
    <QuestionAndAnswers />,
  ];

  return (
    <div className={styles.QuizzModal}>
      <ModalLayout
        modalIsOpen={props.modalIsOpen}
        onSvgClick={props.onSvgClick}
        titleModal={handleTitleModal(modalActiveTab)}
      >
        {modalTabs[modalActiveTab]}
        <div className={styles.buttonContainer}>
          {modalActiveTab === 2 ? (
            <button>Ajouter</button>
          ) : (
            <>
              <button onClick={previousTabClickHandler}>
                {modalActiveTab === 0 ? 'Annuler' : 'Précédent'}
              </button>
              <button onClick={nextTabClickHandler}>Suivant</button>
            </>
          )}
        </div>
      </ModalLayout>
    </div>
  );
};

export default QuizzModal;
