// Library
import React, { useState } from 'react';
// Own files
import styles from './QuizzModal.module.css';

//Hoc
import { QuizzContext } from '../../hoc/Contexts/QuizzContext';

const QuizzModal = (props) => {
  // State
  const [quizz, setQuizz] = useState({
    id: Math.random(),
    title: null,
    questions: [],
    tags: [],
    thematic: [],
    quizzPicture: null,
  });
  // Methods

  // Variables

  return (
    <div className={styles.ContainerModal}>
      <QuizzContext.Provider value={{ quizz }}></QuizzContext.Provider>
    </div>
  );
};

export default QuizzModal;
