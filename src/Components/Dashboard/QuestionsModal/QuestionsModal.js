// Library
import React from 'react';
// Own files
import styles from './QuestionsModal.module.css';

const QuestionsModal = (props) => {
  // States
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  // Variables
  const closedCross = (
    <svg
      width='2em'
      height='2em'
      viewBox='0 0 72 72'
      className={styles.CloseModal}
      onClick={props.onSvgClickOnQuestionModal}
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

  // Methods
  const onQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const onAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <div
      className={`${styles.ContainerModal} ${props.questionModalIsOpen ? styles.animateIn : null}`}
    >
      {closedCross}
      <div className={styles.ModalContent}>
        <h1>Editer un quizz</h1>
        <form>
          <label htmlFor='question'>Votre question</label>
          <input
            type='text'
            id='question'
            value={question}
            onChange={onQuestionChange}
            placeholder='Votre question...'
          />
          <label htmlFor='answer'>
            Votre/vos réponse(s) (Si plusieurs, séparez les avec des virgules)
          </label>
          <input
            type='text'
            id='answer'
            value={answer}
            onChange={onAnswerChange}
            placeholder='Votre/vos réponse(s)'
          />
        </form>
        <button
          type='button'
          className={styles.submitButton}
          onClick={props.onClickButtonCreateQuestion}
        >
          Créer ma question
        </button>
      </div>
    </div>
  );
};

export default QuestionsModal;
