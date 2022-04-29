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
import QuestionsModal from './QuestionsModal/QuestionsModal';

const Dashboard = () => {
  // State
  const [userQuizzs, setUserQuizzs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);
  const [quizzIsClicked, setQuizzIsClicked] = useState(false);
  const [quizzToEdit, setQuizzToEdit] = useState(null);
  const [quizz, setQuizz] = useState({
    title: '',
    questions: [],
    tags: [],
    thematics: [],
    quizzPicture: null,
  });
  const [questions, setQuestions] = useState([]);
  /*
    {
      id: Math.random(),
      question: 'Sur quelles feuilles est assis le chien ?',
      answers: ['Platane', 'Vigne', 'Lierre'],
    },
   */

  // Context
  const { user } = useContext(LoginContext);
  const { uid } = { ...user };
  // componentDidMount
  useEffect(() => {
    fetchUserQuizzs().then((response) => {
      const newState = [...response.quizzs];
      setUserQuizzs(newState);
    });
  }, []);
  // Variables
  const userDoc = doc(db, 'users', uid);

  const quizzsMapped = userQuizzs.map((quizz, index) => {
    return (
      <QuizzCard
        key={index}
        index={index}
        quizzTitle={quizz.title !== '' ? quizz.title : 'Titre du quizz'}
        onSvgClick={() => delHandleClick(quizz.id)}
        onQuizzClick={() => {
          setQuizzIsClicked(!quizzIsClicked);
        }}
        onEditSvgClick={() => onEditSvgClickHandler(quizz.id)}
        quizzPicture={quizz.quizzPicture}
      />
    );
  });

  const userThematics = userQuizzs.map((quizz) => {
    // Trim space and replace comma
    // const cutThematicValue = quizz.thematics.replace(/\s+/g, '').split(',');
    return quizz.thematics;
  });

  const userTags = userQuizzs.map((quizz) => {
    return quizz.tags;
  });

  // Methods
  const handleCreateQuizzClick = async () => {
    setModalIsOpen(!modalIsOpen);

    await setDoc(
      userDoc,
      {
        quizzs: [...userQuizzs, quizz],
      },
      { merge: true }
    );

    fetchUserQuizzs().then((response) => {
      const newState = [...response.quizzs];
      setUserQuizzs(newState);
    });
  };

  const fetchUserQuizzs = async () => {
    console.log('FETCH USER QUIZZ');
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      // console.log('Fetching ... Document ==> ', docSnap.data());

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

  const addQuizzClickHandler = () => {
    setModalIsOpen(true);

    setQuizz({
      id: Math.random(),
      title: '',
      questions: [],
      tags: [],
      thematics: [],
      quizzPicture: null,
    });
  };

  const onSvgClickHandler = () => {
    setModalIsOpen(false);
  };

  const onEditSvgClickHandler = (quizzId) => {
    // Open edit modal & get the data
    console.log('EDIT SVG CLICKED', quizzId);
    setQuizzToEdit(quizzId);
    setQuestionModalIsOpen(true);
  };

  const onSvgClickOnQuestionModal = () => {
    setQuestionModalIsOpen(false);
  };

  const onClickButtonCreateQuestion = (question, answer) => {
    answer = answer.replace(/\s+/g, '').split(',');

    const newState = [
      ...questions,
      {
        id: Math.random(),
        question: question,
        answers: answer,
      },
    ];

    setQuestions(newState);
  };

  const onClickButtonDeleteQuestion = (quizzId) => {
    const newState = questions.filter((question) => {
      return question.id !== quizzId;
    });
    setQuestions(newState);
  };

  return questionModalIsOpen ? (
    <div className={styles.Dashboard}>
      <LeftColumnDashboard
        userThematics={userThematics}
        userTags={userTags}
        numberOfQuizz={userQuizzs.length}
      />
      <QuizzCreator
        quizzsMapped={quizzsMapped}
        addQuizzClickHandler={addQuizzClickHandler}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={() => setModalIsOpen}
        onSvgClickHandler={onSvgClickHandler}
        onEditSvgClickHandler={onEditSvgClickHandler}
        user={user}
        quizz={quizz}
        setQuizz={setQuizz}
        handleCreateQuizzClick={handleCreateQuizzClick}
      />
      <QuestionsModal
        quizzCardId={quizzToEdit}
        questionModalIsOpen={questionModalIsOpen}
        onSvgClickOnQuestionModal={onSvgClickOnQuestionModal}
        onClickButtonCreateQuestion={onClickButtonCreateQuestion}
        questions={questions}
        onClickButtonDeleteQuestion={onClickButtonDeleteQuestion}
        // onQuestionClick={onQuestionClick}
      />
      <RightColumnDashboard quizzIsClicked={quizzIsClicked} />
    </div>
  ) : (
    <div className={styles.Dashboard}>
      <LeftColumnDashboard
        userThematics={userThematics}
        userTags={userTags}
        numberOfQuizz={userQuizzs.length}
      />
      <QuizzCreator
        quizzsMapped={quizzsMapped}
        addQuizzClickHandler={addQuizzClickHandler}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={() => setModalIsOpen}
        onSvgClickHandler={onSvgClickHandler}
        onEditSvgClickHandler={onEditSvgClickHandler}
        user={user}
        quizz={quizz}
        setQuizz={setQuizz}
        handleCreateQuizzClick={handleCreateQuizzClick}
      />
      <RightColumnDashboard quizzIsClicked={quizzIsClicked} />
    </div>
  );
};

export default Dashboard;
