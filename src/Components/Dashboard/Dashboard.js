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
import getFormatedDate from '../../Shared/functions/getFormatedDate';
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
  const [quizzClicked, setQuizzClicked] = useState(null);
  const [quizzToEdit, setQuizzToEdit] = useState(null);
  const [quizzToPreview, setQuizzToPreview] = useState(null);
  const [quizz, setQuizz] = useState({
    title: '',
    questions: [],
    tags: [],
    thematics: [],
    quizzPicture: null,
    createdAt: getFormatedDate(),
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
    // eslint-disable-next-line
  }, []);

  // Variables
  const userDoc = doc(db, 'users', uid);
  const history = useNavigate();

  const quizzsMapped = userQuizzs.map((quizz, index) => {
    return (
      <QuizzCard
        key={index}
        index={index}
        quizzTitle={quizz.title !== '' ? quizz.title : 'Quizz n°' + (index + 1)}
        onSvgClick={() => delHandleClick(quizz.id)}
        onEditSvgClick={() => onEditSvgClickHandler(quizz)}
        onShareSvgClick={() => onShareSvgClickHandler(quizz)}
        onPreviewSvgClick={() => onPreviewSvgClickHandler(quizz)}
        onRefreshStatsSvgClick={() => onRefreshStatsSvgClick(quizz)}
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
  const fetchUserQuizzs = async () => {
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      console.log('Fetch user quizz ==> Firebase');
      return docSnap.data();
    } else {
      console.error('Aucun documents utilisateur trouvé');
    }
  };

  const handleOnQuizzClick = (quizz) => {
    setQuizzClicked(quizz);
    setQuizzIsClicked(true);
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

    console.log(quizz);
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
      title: `Quizz n°${userQuizzs.length + 1}`,
      questions: [],
      tags: [],
      thematics: [],
      quizzPicture: null,
      createdAt: getFormatedDate(),
    });
  };

  const onSvgClickHandler = () => {
    setModalIsOpen(false);
  };

  /* Quizz Card SVG methods */
  const onEditSvgClickHandler = (quizz) => {
    setQuizzToEdit(quizz);
    setQuestionModalIsOpen(true);
  };

  const onShareSvgClickHandler = (quizz) => {
    // generate a link to share
    // const link = `${routes.QUIZZ}/${
    //   displayName ? displayName.toLowerCase() : email.substring(0, email.indexOf('@'))
    // }/${generateSlug(quizz.title)}`;

    // let returnUrl = window.location.protocol + '//' + window.location.host + link;
    // // console.log('returnUrl', returnUrl);
    // window.open(returnUrl, '_blank');

    // Copy the link to clipboard
    // navigator.clipboard.writeText('En cours de développement');

    // Show a toast
    toast.error('Cette fonctionnalité est en cours de développement', { theme: 'colored' });
  };

  const onRefreshStatsSvgClick = (quizz) => {
    console.log('reload');
    console.log(new Date(Date.now()));
    // Show a toast
    toast.error('Cette fonctionnalité est en cours de développement', { theme: 'colored' });
  };

  const onPreviewSvgClickHandler = (quizz) => {
    setPreviewQuizzOpen(true);
    setQuizzToPreview(quizz);
  };

  const onSvgClickOnQuestionModal = () => {
    setQuestionModalIsOpen(false);
  };

  const onClickButtonCreateQuestion = (question, answer, questionPicture) => {
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
          history(routes.HOME, { replace: true });
          history(routes.DASHBOARD, { replace: true });
        }, 500);
        toast.success('Votre quizz a bien été modifié !', { theme: 'colored' });
      })
      .catch((error) => {
        console.error(error);
        toast.warning('Une erreur est survenue !', { theme: 'colored' });
      });
  };

  const handleMainContainerClick = (event) => {
    if (event.target.nodeName === 'IMG' && event.target.classList.item(0) === 'card') {
      return;
    } else if (event.target.nodeName === 'DIV' && event.target.classList.item(0) === 'card') {
      return;
    } else {
      setQuizzIsClicked(false);
    }
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
        onMainContainerClick={handleMainContainerClick}
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
      <RightColumnDashboard quizzIsClicked={quizzIsClicked} quizz={quizzClicked} />
    </div>
  );
};

export default Dashboard;
