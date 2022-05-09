// Library
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
// Own Files
import styles from './Dashboard.module.css';
import { db } from '../../config/firebase';
import { LoginContext } from '../../hoc/Contexts/LoginContext';
import routes from '../../config/routes';
import { generateSlug } from '../../Shared/functions/generateSlug';
// Components
import LeftColumnDashboard from './LeftColumnDashboard/LeftColumnDashboard';
import QuizzCreator from './QuizzCreator/QuizzCreator';
import RightColumnDashboard from './RightColumnDashboard/RightColumnDashboard';
import QuizzCard from './QuizzCreator/QuizzCard/QuizzCard';
import QuestionsModal from './QuestionsModal/QuestionsModal';
import GeneratedQuizz from './GeneratedQuizz/GeneratedQuizz';

const Dashboard = () => {
  // State
  const [userQuizzs, setUserQuizzs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);
  const [previewQuizzOpen, setPreviewQuizzOpen] = useState(false);
  const [quizzIsClicked, setQuizzIsClicked] = useState(false);
  const [quizzToEdit, setQuizzToEdit] = useState(null);
  const [quizzToPreview, setQuizzToPreview] = useState(null);
  const [quizz, setQuizz] = useState({
    title: '',
    questions: [],
    tags: [],
    thematics: [],
    quizzPicture: null,
  });

  // Context
  const { user } = useContext(LoginContext);
  const { uid, displayName, email } = { ...user };

  // componentDidMount
  useEffect(() => {
    fetchUserQuizzs().then((response) => {
      const newState = [...response.quizzs];
      setUserQuizzs(newState);
    });
  }, []);

  // Variables
  const userDoc = doc(db, 'users', uid);
  const history = useNavigate();

  const quizzsMapped = userQuizzs.map((quizz, index) => {
    return (
      <QuizzCard
        key={index}
        index={index}
        quizzTitle={quizz.title !== '' ? quizz.title : 'Titre du quizz'}
        onSvgClick={() => delHandleClick(quizz.id)}
        onEditSvgClick={() => onEditSvgClickHandler(quizz)}
        onShareSvgClick={() => onShareSvgClickHandler(quizz)}
        onPreviewSvgClick={() => onPreviewSvgClickHandler(quizz)}
        quizzPicture={quizz.quizzPicture}
        onQuizzClick={() => {
          handleOnQuizzClick(quizz);
        }}
      />
    );
  });

  const userThematics = userQuizzs.map((quizz) => {
    return quizz.thematics;
  });

  const userTags = userQuizzs.map((quizz) => {
    return quizz.tags;
  });

  // Methods
  const handleOnQuizzClick = (quizz) => {
    console.log('quizzClicked', quizz);
  };

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
      toast.success('Votre quizz a bien été créé !', { theme: 'colored' });
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
    // confirm
    const confirm = window.confirm('Voulez-vous vraiment supprimer ce quizz ?');
    if (confirm) {
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
    }
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

  /* Quizz Card SVG methods */
  const onEditSvgClickHandler = (quizz) => {
    // Open edit modal & get the data
    setQuizzToEdit(quizz);
    setQuestionModalIsOpen(true);
  };

  const onShareSvgClickHandler = (quizz) => {
    // generate a link to share
    const link = `${routes.QUIZZ}/${
      displayName ? displayName.toLowerCase() : email.substring(0, email.indexOf('@'))
    }/${generateSlug(quizz.title)}`;

    // Copy the link to clipboard
    navigator.clipboard.writeText('localhost:3000' + link);

    // Show a toast
    toast.info('Le lien a bien été copié dans votre press papier !', { theme: 'colored' });
  };

  const onPreviewSvgClickHandler = (quizz) => {
    // // create new react-router-dom route
    // const newRoute = <Route path={link} element={<GeneratedQuizz quizz={quizz} />} />;
    // // // open in a new tab
    // window.open(newRoute, '_blank');
    setPreviewQuizzOpen(true);
    setQuizzToPreview(quizz);
  };

  const onSvgClickOnQuestionModal = () => {
    setQuestionModalIsOpen(false);
  };

  const onClickButtonCreateQuestion = (question, answer) => {
    if (question !== '' && answer !== '') {
      // Trim space and replace comma
      answer = answer.replace(/\s+/g, '').split(',');

      const newQuestion = {
        id: Math.random(),
        question: question,
        answers: answer,
      };

      setQuizzToEdit({ ...quizzToEdit, questions: [...quizzToEdit.questions, newQuestion] });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  const onClickButtonDeleteQuestion = (questionClickedId) => {
    const newQuestions = quizzToEdit.questions.filter((question) => {
      return question.id !== questionClickedId;
    });
    setQuizzToEdit({ ...quizzToEdit, questions: newQuestions });
    toast.info('La question a bien été supprimée', { theme: 'colored' });
  };

  const onDeleteAnswerClick = (answerClickedIndex, answersArray, questionId) => {
    const newAnswers = answersArray.filter((answer, index) => {
      return index !== answerClickedIndex;
    });

    const newQuestions = quizzToEdit.questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, answers: newAnswers };
      } else {
        return question;
      }
    });
    setQuizzToEdit({ ...quizzToEdit, questions: newQuestions });

    toast.info('La réponse a bien été supprimée', { theme: 'colored' });
  };

  const onClickConfirmEdit = () => {
    setLoading(true);
    fetchUserQuizzs() // Promise
      .then((response) => {
        const quizzIndex = response.quizzs.findIndex((quizz) => {
          return quizz.id === quizzToEdit.id;
        });
        const userQuizzs = response.quizzs;

        const newUserQuizzs = [...userQuizzs];
        newUserQuizzs[quizzIndex] = quizzToEdit;

        updateDoc(userDoc, {
          quizzs: newUserQuizzs,
        });

        setLoading(false);
        setQuestionModalIsOpen(false);
        setQuizzToEdit(null);
        // Refresh component
        setTimeout(() => {
          history.push(routes.HOME);
          history.push(routes.DASHBOARD);
        }, 100);
        toast.success('Votre quizz a bien été modifié !', { theme: 'colored' });
      })
      .catch((error) => {
        console.log(error);
        toast.warning('Une erreur est survenue !', { theme: 'colored' });
      });
  };

  return (
    <div className={styles.Dashboard}>
      <LeftColumnDashboard
        userThematics={userThematics}
        userTags={userTags}
        numberOfQuizz={userQuizzs.length}
      />
      <QuizzCreator
        userQuizzs={userQuizzs}
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
      {previewQuizzOpen ? (
        <GeneratedQuizz
          quizz={quizzToPreview}
          previewQuizzOpen={previewQuizzOpen}
          onSvgClick={() => {
            setPreviewQuizzOpen(false);
            setQuizzToPreview(null);
          }}
        />
      ) : null}
      {questionModalIsOpen && quizzToEdit !== null ? (
        <QuestionsModal
          quizzTitle={quizzToEdit.title}
          questions={quizzToEdit.questions}
          loading={loading}
          questionModalIsOpen={questionModalIsOpen}
          onSvgClickOnQuestionModal={onSvgClickOnQuestionModal}
          onClickButtonCreateQuestion={onClickButtonCreateQuestion}
          onClickButtonDeleteQuestion={onClickButtonDeleteQuestion}
          onDeleteAnswerClick={onDeleteAnswerClick}
          onClickConfirmEdit={onClickConfirmEdit}
        />
      ) : null}
      <RightColumnDashboard quizzIsClicked={quizzIsClicked} />
    </div>
  );
};

export default Dashboard;
