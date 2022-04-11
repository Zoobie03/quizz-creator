// Library
import React from 'react';
// Own files
import styles from './AddQuestion.module.css';

const AddQuestion = (props) => {
  // States
  const [questions, setQuestions] = React.useState([]);

  // Methods
  const handleDeleteClick = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  // Variables
  const addQuestionSVG = (
    <svg width='1.5em' height='1.5em' viewBox='0 0 512 512'>
      <path
        fill='none'
        stroke='#cceac3'
        strokeMiterlimit='10'
        strokeWidth='32'
        d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z'
      ></path>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
        d='M256 176v160m80-80H176'
      ></path>
    </svg>
  );

  return (
    <div className={styles.AddQuestion}>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => {
            return (
              <li key={question.id}>
                {question.question}
                <svg
                  onClick={() => handleDeleteClick(question.id)}
                  width='1em'
                  height='1em'
                  viewBox='0 0 16 16'
                >
                  <path
                    fill='red'
                    d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'
                  ></path>
                </svg>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3>Aucune question</h3>
      )}
      <button onClick={props.handleAddQuestionClick}>{addQuestionSVG} Ajouter</button>
    </div>
  );
};

export default AddQuestion;
