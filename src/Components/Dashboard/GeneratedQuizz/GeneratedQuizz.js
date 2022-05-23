// Library
import React from 'react';
// Own files
import styles from './GeneratedQuizz.module.css';
// Component
import Question from './Question/Question';

const GeneratedQuizz = (props) => {
  // Methods
  const isEven = (index) => {
    if (index % 2 === 0) {
      return true;
    } else {
      return false;
    }
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
            Le quizz contient acutellement{' '}
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
                      question={question}
                      questionBorderColor={isEven(index) ? '#3867edcc' : '#9603fe99'}
                      questionBorderRadius={isEven(index) ? '30px 0 30px 0' : '0 30px 0 30px'}
                      picture={question?.questionPicture?.picturePath}
                    />
                  );
                })
              : ''}
          </ul>
        </div>
        {props?.quizz?.questions.length > 0 ? (
          <button type='button'>
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
