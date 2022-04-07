// Librairies
import React, { useContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
// Own files
import { db } from '../../../config/firebase';
import styles from './QuizzCreator.module.css';
// Hoc
import { LoginContext } from '../../../hoc/Contexts/LoginContext';
// Components
import QuizzModal from '../../QuizzModal/QuizzModal';
import QuizzCard from './QuizzCard/QuizzCard';

const QuizzCreator = () => {
  // State
  const [quizzs, setQuizzs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Context
  const { user } = useContext(LoginContext);
  const { uid } = { ...user };

  // componentDidMount
  useEffect(() => {
    fetchUserQuizzs();
  }, []);

  // Variables
  const userDoc = doc(db, 'users', uid);

  // Methods
  const fetchUserQuizzs = async () => {
    console.log('FETCH USER QUIZZ');
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      // console.log('Fetching ... Document ==> ', docSnap.data());

      const newState = [...docSnap.data().quizzs];
      setQuizzs(newState);

      return docSnap.data();
    } else {
      // console.log('NO Documents ==X>');
    }
  };

  const delHandleClick = (quizzId) => {
    fetchUserQuizzs() // Promise
      .then((response) => {
        const userQuizzs = response.quizzs;
        const userQuizzsFiltered = userQuizzs.filter((quizz) => {
          return quizz.id !== quizzId;
        });

        setQuizzs(userQuizzsFiltered);

        updateDoc(userDoc, {
          quizzs: userQuizzsFiltered,
        });
      })
      .catch((error) => console.log(error));
  };

  const quizzsMapped = quizzs.map((quizz, index) => {
    return (
      <QuizzCard
        key={quizz.id}
        index={index}
        quizzTitle={quizz.title !== null ? quizz.title : 'Titre du quizz'}
        onClick={() => delHandleClick(quizz.id)}
      />
    );
  });

  const addQuizzClickHandler = async () => {
    setModalIsOpen(true);

    const quizzTemplate = {
      id: Math.random(),
      title: null,
      questions: [],
      tags: [],
      thematic: [],
      quizzPicture: null,
    };

    fetchUserQuizzs();

    await setDoc(
      userDoc,
      {
        quizzs: [...quizzs, quizzTemplate],
      },
      { merge: true }
    );
  };

  const onSvgClickHandler = () => {
    setModalIsOpen(false);
  };

  return modalIsOpen ? (
    <QuizzModal modalIsOpen={modalIsOpen} onSvgClick={onSvgClickHandler} />
  ) : (
    <div className={styles.QuizzCreator}>
      <h1>Dashboard {user.displayName}</h1>
      <ul className={styles.wrapperQuizzs}>
        {quizzsMapped.length > 0 ? quizzsMapped : <h2>Vous n'avez aucuns Quizz pour l'instant</h2>}

        <div onClick={addQuizzClickHandler} className={styles.svgContainer}>
          <svg width='150px' height='150px' viewBox='0 0 24 24'>
            <path
              d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'
              fill='#71eb4d'
            ></path>
          </svg>
          <span>Créer un quizz</span>
        </div>
      </ul>
    </div>
  );
};

export default QuizzCreator;