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
  const [loading, setLoading] = useState(false);
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
          setQuizzIsClicked(!quizzIsClicked); // need to be modified
        }}
        onEditSvgClick={() => onEditSvgClickHandler(quizz)}
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
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      console.log('FETCH USER QUIZZ');
      return docSnap.data();
    } else {
      console.error('Aucun documents utilisateur trouvé');
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
    setQuizzToEdit(null);
    setModalIsOpen(false);
  };

  const onEditSvgClickHandler = (quizz) => {
    // Open edit modal & get the data
    setQuizzToEdit(quizz);
    setQuestionModalIsOpen(true);
  };

  const onSvgClickOnQuestionModal = () => {
    setQuestionModalIsOpen(false);
  };

  const onClickButtonCreateQuestion = (question, answer) => {
    // Trim space and replace comma
    answer = answer.replace(/\s+/g, '').split(',');

    const newQuestion = {
      id: Math.random(),
      question: question,
      answers: answer,
    };

    setQuizzToEdit({ ...quizzToEdit, questions: [...quizzToEdit.questions, newQuestion] });
  };

  const onClickButtonDeleteQuestion = (questionClicked) => {};

  const onDeleteAnswerClick = (answerClickedIndex, answersArray, questionId) => {};

  const onClickConfirmEdit = () => {
    setLoading(true);
    console.log('CONFIRM EDIT');
    fetchUserQuizzs() // Promise
      .then((response) => {
        const quizzIndex = response.quizzs.findIndex((quizz) => {
          return quizz.id === quizzToEdit.id;
        });
        const userQuizzs = response.quizzs;

        console.log(userQuizzs[quizzIndex]);
        console.log(quizzToEdit);

        const newUserQuizzs = [...userQuizzs];
        newUserQuizzs[quizzIndex] = quizzToEdit;

        updateDoc(userDoc, {
          quizzs: newUserQuizzs,
        });

        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return questionModalIsOpen && quizzToEdit !== null ? (
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
        questions={quizzToEdit.questions}
        loading={loading}
        questionModalIsOpen={questionModalIsOpen}
        onSvgClickOnQuestionModal={onSvgClickOnQuestionModal}
        onClickButtonCreateQuestion={onClickButtonCreateQuestion}
        onClickButtonDeleteQuestion={onClickButtonDeleteQuestion}
        onDeleteAnswerClick={onDeleteAnswerClick}
        onClickConfirmEdit={onClickConfirmEdit}
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
