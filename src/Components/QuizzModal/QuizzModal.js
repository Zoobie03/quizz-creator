// Library
import React, { useState } from 'react';
// Own files
import styles from './QuizzModal.module.css';
// Components
import CreateQuizz from './CreateQuizz/CreateQuizz';
import AddQuestion from './AddQuestion/AddQuestion';
import QuestionAndAnswers from './AddQuestion/QuestionAndAnswers/QuestionAndAnswers';
//Hoc
import { QuizzContext } from '../../hoc/Contexts/QuizzContext';

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

  const quizzTemplate = {
    id: Math.random(),
    title: null,
    questions: [],
    tags: [],
    thematic: [],
    quizzPicture: null,
  };

  return (
    <div className={styles.ContainerModal}>
      <div className={styles.ModalContent}>
        <QuizzContext.Provider value={{ quizzTemplate }}>
          {modalTabs[modalActiveTab]}
          <div className={styles.buttonContainer}>
            {modalActiveTab === 2 ? (
              <button>Confirmer</button>
            ) : (
              <>
                <button onClick={previousTabClickHandler}>
                  {modalActiveTab === 0 ? 'Annuler' : 'Précédent'}
                </button>
                <button onClick={nextTabClickHandler}>Suivant</button>
              </>
            )}
          </div>
        </QuizzContext.Provider>
      </div>
    </div>
  );
};

export default QuizzModal;
