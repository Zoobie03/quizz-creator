// Library
import React, { useState, useEffect, useContext } from 'react';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
// Own Files
import styles from './Dashboard.module.css';
import { db } from '../../config/firebase';
import { LoginContext } from '../../hoc/Contexts/LoginContext';
// Components
import LeftColumnDashboard from './LeftColumnDashboard/LeftColumnDashboard';
import QuizzCreator from './QuizzCreator/QuizzCreator';
import RightColumnDashboard from './RightColumnDashboard/RightColumnDashboard';
import QuizzCard from './QuizzCreator/QuizzCard/QuizzCard';

const Dashboard = () => {
  // State
  const [userQuizzs, setUserQuizzs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [quizzIsClicked, setQuizzIsClicked] = useState(false);
  // Context
  const { user } = useContext(LoginContext);
  const { uid } = { ...user };
  // componentDidMount
  useEffect(() => {
    fetchUserQuizzs();
  }, []);
  // Variables
  const userDoc = doc(db, 'users', uid);

  const quizzsMapped = userQuizzs.map((quizz, index) => {
    return (
      <QuizzCard
        key={index}
        index={index}
        quizzTitle={quizz.title !== null ? quizz.title : 'Titre du quizz'}
        onSvgClick={() => delHandleClick(quizz.id)}
        onQuizzClick={() => {
          setQuizzIsClicked(!quizzIsClicked);
        }}
      />
    );
  });

  // Methods
  const fetchUserQuizzs = async () => {
    console.log('FETCH USER QUIZZ');
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      // console.log('Fetching ... Document ==> ', docSnap.data());

      const newState = [...docSnap.data().quizzs];
      setUserQuizzs(newState);

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

        setUserQuizzs(userQuizzsFiltered);

        updateDoc(userDoc, {
          quizzs: userQuizzsFiltered,
        });
      })
      .catch((error) => console.log(error));
  };

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
        quizzs: [...userQuizzs, quizzTemplate],
      },
      { merge: true }
    );
  };

  const onSvgClickHandler = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={styles.Dashboard}>
      <LeftColumnDashboard numberOfQuizz={userQuizzs.length} />
      <QuizzCreator
        quizzsMapped={quizzsMapped}
        addQuizzClickHandler={addQuizzClickHandler}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={() => setModalIsOpen}
        onSvgClickHandler={onSvgClickHandler}
        user={user}
      />
      <RightColumnDashboard quizzIsClicked={quizzIsClicked} />
    </div>
  );
};

export default Dashboard;
