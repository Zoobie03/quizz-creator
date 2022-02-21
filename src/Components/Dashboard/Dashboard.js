// Librairies
import React, { useContext, useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { doc, updateDoc, setDoc, db} from '../../config/firebase';
import { fetchDataOnFirestore } from '../../Shared/utility';
import routes from '../../config/routes';

// Hoc
import { LoginContext } from '../../hoc/Contexts/LoginContext';
  

const Dashboard = (props) => {

  const setDataOnFireStore = async (uid) => {
    // Route for the unique user doc
    const userDoc = doc(db, "users", uid);
    console.log('setDataOnFireStore en action !')
    // Template of a newQuizz
    const newQuizz = {
      id: Math.random(),
      title: "",
      thematics: [],
      tags: [],
      questions: [],
    }
  
    fetchDataOnFirestore(uid) // Promise
      .then(userData => {

        setDoc(userDoc, {
          ...userData,
          quizzs: [...userData.quizzs, newQuizz]
        } , {merge: "true"}) // Promise
          .then(()=> {

            fetchDataOnFirestore(uid).then(userData => {
              const newState = [...userData.quizzs];
              setQuizzs(newState);

            });
          }).catch(error => console.log(error));

      }).catch(error => console.log(error));
  }


  // State
  const [quizzs, setQuizzs] = useState([]);
  
  // Context
  const { user } = useContext(LoginContext);
  const { displayName, email, emailVerified, photoURL, phoneNumber, uid } = user;

  // componentDidMount
  useEffect(() => {

    fetchDataOnFirestore(uid).then(userData => {
      const newState = [...userData.quizzs];
      setQuizzs(newState);
    });

  }, []);
  
  /////////// DELETE ON FIRESTORE //////////////////
  const delHandleClick = (quizzId) => {
    const userDoc = doc(db, "users", uid);
    console.log('delHandleClick en action !');

    fetchDataOnFirestore(uid) // Promise
      .then(response => {
        const userQuizzs = response.quizzs;

        const userQuizzsFiltered = userQuizzs.filter(quizz => {
          return quizz.id !== quizzId;
        });

        setQuizzs(userQuizzsFiltered);

        updateDoc(userDoc, {
          quizzs: userQuizzsFiltered
        })
      })
      .catch(error => console.log(error));
  }

  const quizzsMapped = quizzs.map((quizz, index) => {
    return (
      <li key={quizz.id} className={styles.QuizzCard}>
        <span onClick={() => delHandleClick(quizz.id)}>suprrimer Quizz n {index}</span>
      </li>
    )
  })

  const addQuizzClickHandler = async () => {
    setDataOnFireStore(uid)
    await fetchDataOnFirestore(uid).then(userData => {
      const newState = [...userData.quizzs];
      setQuizzs(newState);
    });
  }

  return (
    <div className={styles.Dashboard}>
      <h1>Dashboard  {user.displayName}</h1>
      <ul className={styles.wrapperQuizzs}>

        {quizzsMapped.length > 0 ? quizzsMapped : <h2>Vous n'avez aucuns Quizz pour l'instant</h2>}
        
        <div onClick={addQuizzClickHandler} className={styles.svg} >
          <svg  width="125px" height="125px" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="#71eb4d">
            </path>
          </svg>
        </div>
      </ul>
    </div>
  );
};

export default Dashboard;
