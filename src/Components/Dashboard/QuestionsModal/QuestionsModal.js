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

  const downArrow = (
    <svg width='1em' height='1em' viewBox='0 0 24 24'>
      <path fill='#888888' d='M8 5v14l11-7L8 5z'></path>
    </svg>
  );

  const trashSvg = (
    <svg width='1em' height='1em' viewBox='0 0 16 16' className={styles.trashSvg} fill='red'>
      <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'></path>
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
          <button
            type='button'
            className={styles.submitButton}
            onClick={props.onClickButtonCreateQuestion}
          >
            Créer ma question
          </button>
        </form>
        <h2>Liste de vos questions</h2>
        <ul className={styles.questionsList}>
          {props.questions.map((question, index) => {
            return (
              <li key={index} className={styles.question} onClick={props.onQuestionClick}>
                <div className={styles.questionText}>
                  <button
                    type='button'
                    className={styles.deleteQuestion}
                    onClick={() => props.onClickButtonDeleteQuestion(question.id)}
                  >
                    Supprimer
                  </button>
                  <p>{question.question}</p>
                  {downArrow}
                </div>
                <ul className={styles.answersList}>
                  {question.answers.map((answer, index) => {
                    return (
                      <li key={index} className={styles.answer}>
                        <p>{answer}</p>
                        {trashSvg}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionsModal;
