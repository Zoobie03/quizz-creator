// LIbrary
import React from 'react';
// Own Files
import styles from './QuizzCard.module.css';

const QuizzCard = (props) => {
  return (
    <li className={styles.QuizzCard}>
      <div className={styles.quizzPicture} onClick={props.onQuizzClick}>
        {props.quizzPicture ? <img src={props.quizzPicture} alt={props.quizzTitle} /> : null}
        <span>{props.index + 1}</span>
        {/* Trash Icon */}
        <div title='Supprimer le quizz'>
          <svg
            width='1.3em'
            height='1.3em'
            viewBox='0 0 16 16'
            onClick={props.onSvgClick}
            className={`${styles.svg} ${styles.trashSvg}`}
            fill='red'
          >
            <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'></path>
          </svg>
        </div>
        {/* Edit Icon */}
        <div title='Éditer le quizz'>
          <svg
            width='1.3em'
            height='1.3em'
            viewBox='0 0 16 16'
            fill='#888888'
            className={`${styles.svg} ${styles.editSvg}`}
            onClick={props.onEditSvgClick}
          >
            <path d='M5 1a.5.5 0 0 1 .5.5V2h2v-.5a.5.5 0 0 1 1 0V2h2v-.5a.5.5 0 0 1 1 0V2A1.5 1.5 0 0 1 13 3.5v2.536a2.547 2.547 0 0 0-1 .406V3.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h1.547v.002a1.59 1.59 0 0 0 .068.998H4.5A1.5 1.5 0 0 1 3 13.5v-10A1.5 1.5 0 0 1 4.5 2v-.5A.5.5 0 0 1 5 1Zm5 7c.107 0 .206.034.288.091L9.378 9H6a.5.5 0 0 1 0-1h4Zm-3.004 3.435A.5.5 0 0 0 6.5 11H6a.5.5 0 0 0 0 1h.5a.498.498 0 0 0 .157-.025c.097-.189.21-.37.339-.54ZM6 5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6Zm6.338 2.455a1.56 1.56 0 0 1 2.207 2.207l-4.289 4.288a2.777 2.777 0 0 1-1.29.731l-1.211.303a.61.61 0 0 1-.74-.74l.304-1.21c.122-.489.374-.935.73-1.29l4.289-4.289Z'></path>
          </svg>
        </div>
        {/* Share Svg */}
        <div title='Partager le quizz'>
          <svg
            width='1.3em'
            height='1.3em'
            viewBox='0 0 24 24'
            className={`${styles.svg} ${styles.shareSvg}`}
            onClick={props.onShareSvgClick}
          >
            <path
              fill='skyblue'
              d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7c0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66c0 1.61 1.31 2.91 2.92 2.91c1.61 0 2.92-1.3 2.92-2.91A2.92 2.92 0 0 0 18 16.08Z'
            ></path>
          </svg>
        </div>
        {/* Preview svg */}
        <div title='Prévisualiser le quizz'>
          <svg
            width='1.3em'
            height='1.3em'
            viewBox='0 0 48 48'
            className={`${styles.svg} ${styles.previewSvg}`}
            onClick={props.onPreviewSvgClick}
          >
            <g fill='#ffffff00' stroke='#9603fea1' strokeLinejoin='round' strokeWidth='3'>
              <path d='M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z'></path>
              <path d='M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z'></path>
            </g>
          </svg>
        </div>
      </div>
      <span className={styles.quizzTitle}>{props.quizzTitle}</span>
    </li>
  );
};

export default QuizzCard;
