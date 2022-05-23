// Library
import React, { useState, useRef, useEffect } from 'react';
import LoadingSvg from '../../../pictures/loading/LoadingSvg';
// Own files
import styles from './QuestionsModal.module.css';

const QuestionsModal = (props) => {
  // States
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionPicture, setQuestionPicture] = useState(null);

  const questionInputRef = useRef();

  // ComponentDidUpdate
  useEffect(() => {
    setQuestionPicture(null);
    questionInputRef.current.focus();

    setQuestion('');
    setAnswer('');

    return () => {
      setQuestionPicture(null);
    };
  }, [props.questions]);

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
      <path fill='#000' d='M8 5v14l11-7L8 5z'></path>
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

  // Imperative Code
  const onQuestionClick = (index) => {
    const questionClicked = document.getElementById(`question${index}`);
    const isSvgChild = questionClicked.childNodes.item(0).childNodes.item(2).nodeName === 'svg';

    if (questionClicked.childNodes.item(1).style.display === 'block') {
      if (isSvgChild) {
        questionClicked.childNodes.item(0).childNodes.item(2).style.transform = 'rotate(0deg)';
      } else {
        questionClicked.childNodes.item(0).childNodes.item(3).style.transform = 'rotate(0deg)';
      }
      questionClicked.childNodes.item(1).style.display = 'none';
    } else {
      if (isSvgChild) {
        questionClicked.childNodes.item(0).childNodes.item(2).style.transform = 'rotate(90deg)';
      } else {
        questionClicked.childNodes.item(0).childNodes.item(3).style.transform = 'rotate(90deg)';
      }
      questionClicked.childNodes.item(1).style.display = 'block';
    }
  };

  return (
    <div
      className={`${styles.ContainerModal} ${props.questionModalIsOpen ? styles.animateIn : null}`}
    >
      {closedCross}
      <div className={styles.ModalContent}>
        <h1>{props.quizzTitle}</h1>
        <div className={styles.wrapperContent}>
          <div className={styles.formQuestion}>
            <h2>Création de question/réponses</h2>
            <form>
              {/* QUESTIION */}
              <label htmlFor='question'>
                Votre question
                <input
                  type='text'
                  id='question'
                  ref={questionInputRef}
                  value={question}
                  onChange={onQuestionChange}
                  placeholder='Votre question...'
                />
              </label>

              {/* QUESTION PICTURE */}
              <label htmlFor='questionPicture' className={styles.customFileUpload}>
                <svg width='2em' height='2em' viewBox='0 0 24 24'>
                  <path
                    fill='#888888'
                    d='M14 13v4h-4v-4H7l5-5l5 5m2.35-2.97A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.03A6.004 6.004 0 0 0 0 14a6 6 0 0 0 6 6h13a5 5 0 0 0 5-5c0-2.64-2.05-4.78-4.65-4.97Z'
                  ></path>
                </svg>
                Image de votre question
                <input
                  type='file'
                  id='questionPicture'
                  onChange={(event) => {
                    setQuestionPicture(event.target?.files[0]);
                  }}
                />
              </label>

              {/* ANSWERS */}
              <label htmlFor='answer'>
                Votre/vos réponse(s) (Si plusieurs, séparez les avec des virgules)
                <input
                  type='text'
                  id='answer'
                  value={answer}
                  onChange={onAnswerChange}
                  placeholder='Votre/vos réponse(s)'
                />
              </label>

              <div className={styles.warningAndCreateQuestionButton}>
                <span>🚨 N'oubliez pas de confirmer l'édition avant de fermer la fenêtre 🚨</span>
                <button
                  type='button'
                  className={styles.createQuestion}
                  onClick={() =>
                    props.onClickButtonCreateQuestion(question, answer, questionPicture)
                  }
                >
                  Créer ma question
                </button>
              </div>
            </form>
          </div>
          <div className={styles.wrapperQuestionsList}>
            <h2>Liste de vos questions</h2>
            <ul className={styles.questionsList}>
              {props.questions.length > 0 ? (
                props.questions?.map((question, index) => {
                  return (
                    <li key={index} className={styles.question} id={`question${index}`}>
                      <div className={styles.questionText}>
                        <button
                          type='button'
                          className={styles.deleteQuestion}
                          onClick={() => props.onClickButtonDeleteQuestion(question, index)}
                        >
                          Supprimer
                        </button>
                        {question.questionPicture !== null ? (
                          <div title='Cette question contient une image'>
                            <svg width='1.2em' height='1.2em' viewBox='0 0 1024 1024'>
                              <path
                                fill='white'
                                d='M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3l150.1 178L658.1 489L888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2zM304 456a88 88 0 1 0 0-176a88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28s-28-12.5-28-28s12.5-28 28-28z'
                              ></path>
                            </svg>
                          </div>
                        ) : null}
                        <p onClick={() => onQuestionClick(index, question)}>
                          {question.question.toUpperCase()}
                        </p>
                        {downArrow}
                      </div>
                      <ul key={index} className={styles.answersList}>
                        {question?.answers.length > 0 ? (
                          question.answers.map((answer, index) => {
                            return (
                              <li key={index} className={styles.answer}>
                                {/* answer.toCapitalizeCase */}
                                <p>{answer}</p>
                                <button
                                  onClick={() =>
                                    props.onDeleteAnswerClick(index, question.answers, question.id)
                                  }
                                  className={styles.deleteAnswerButton}
                                >
                                  {trashSvg}
                                </button>
                              </li>
                            );
                          })
                        ) : (
                          <li className={styles.answer}>
                            <p>Aucune réponse</p>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                })
              ) : (
                <li className={styles.noQuestion}>Vous n'avez aucune question ... 🤔</li>
              )}
            </ul>
          </div>
        </div>
        {props.loading === false ? (
          <button type='button' className={styles.confirmEdit} onClick={props.onClickConfirmEdit}>
            Confirmer l'édition
          </button>
        ) : (
          <LoadingSvg className={styles.confirmEdit} />
        )}
      </div>
    </div>
  );
};

export default QuestionsModal;
