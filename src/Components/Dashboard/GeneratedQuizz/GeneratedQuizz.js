// Library
import React, { useEffect, useState } from 'react';
// Own files
import styles from './GeneratedQuizz.module.css';
// Component
import Question from './QuestionCard/QuestionCard';

const GeneratedQuizz = (props) => {
  // State
  const [answerInputs, setAnswerInputs] = useState([]);
  const [questionsCards, setQuestionsCards] = useState([]);
  // ComponentDidMount
  useEffect(() => {
    const newQuestionsCards = document.getElementsByClassName('questionCard');
    setQuestionsCards(newQuestionsCards);

    let newAnswerInputs = [];

    for (let i = 0; i < newQuestionsCards.length; i++) {
      newAnswerInputs = [...newAnswerInputs, document.querySelector(`#answerQuestion--${i + 1}`)];
    }

    setAnswerInputs(newAnswerInputs);
  }, []);

  // Methods
  const isEven = (index) => {
    return index % 2 === 0 ? true : false;
  };

  const handleClick = (quizz) => {
    console.log(answerInputs);
    console.log(quizz);
  };

  // Variables
  const closedCross = (
    <svg
      width='2em'
      height='2em'
      viewBox='0 0 72 72'
      className={styles.CloseModal}
      onClick={props.onSvgClick}
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
    <div className={`${styles.ContainerModal} ${props.previewQuizzOpen ? styles.animateIn : null}`}>
      {closedCross}
      <div className={styles.ModalContent}>
        <h1>{props?.quizz?.title || 'Titre du quizz généré'}</h1>
        <div className={styles.forAuthor}>
          <span>
            Le quizz contient acuellement{' '}
            <b>
              {props?.quizz?.questions?.length || 'aucunes'}
              {props?.quizz?.questions.length > 1 ? ' questions' : ' question'}
            </b>{' '}
          </span>
          <span>(visible uniquement par l'auteur)</span>
        </div>
        <div className={styles.QuestionsContainer}>
          <ul>
            {props?.quizz?.questions.length > 0
              ? props?.quizz?.questions?.map((question, index) => {
                  return (
                    <Question
                      key={index}
                      index={index}
                      className='questionCard'
                      question={question}
                      questionBorderColor={isEven(index) ? '#3867edcc' : '#9603fe99'}
                      questionBorderRadius={isEven(index) ? '15px 0 15px 0' : '0 15px 0 15px'}
                      questionBackgroundColor={isEven(index) ? '#4040eb' : 'blueviolet'}
                      picture={question?.questionPicture?.picturePath}
                    />
                  );
                })
              : ''}
          </ul>
        </div>
        {props?.quizz?.questions.length > 0 ? (
          <button type='button' onClick={() => handleClick(props.quizz)}>
            {props.quizz.questions.length > 1 ? 'Confirmer ma réponse' : 'Confirmer mes réponses'}
          </button>
        ) : (
          <span className={styles.noQuestionMessage}>
            Vous n'avez aucune question dans ce quizz. Si vous voulez un aperçu de votre quizz, il
            vous faut au minimum 1 question.
          </span>
        )}
      </div>
    </div>
  );
};

export default GeneratedQuizz;
