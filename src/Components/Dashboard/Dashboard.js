// Librairies
import React, { useContext, useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { fetchDataOnFirestore, setDataOnFireStore } from '../../Shared/utility';

// Hoc
import { LoginContext } from '../../hoc/Contexts/LoginContext';
import routes from '../../config/routes';

const Dashboard = (props) => {

  // State
  const [quizzs, setQuizzs] = useState([]);
  
  // Context
  const { user } = useContext(LoginContext);
  const { displayName, email, emailVerified, photoURL, phoneNumber, uid } = user;
  
  // Fetch
  // console.log(fetchDataOnFirestore(user.uid))


  // componentDidMount
  useEffect(() => {
    
    fetchDataOnFirestore(uid).then(userData => {
      const newState = [...userData.quizzs];
      setQuizzs(newState);
    });

    return () => {}

  }, [quizzs]);
  
  const quizzsMapped = quizzs.map(quizz => {
    return (
      <li key={quizz.id} className={styles.QuizzCard}>

      </li>
    )
  })

  const addQuizzClickHandler = () => {
    setDataOnFireStore(uid).then(r => {
      props.history.push(routes.DASHBOARD);
    })
  }

  return (
    <div className={styles.Dashboard}>
      <h1>Dashboard - {user.displayName}</h1>
      <ul className={styles.wrapperQuizzs}>
        {quizzsMapped}
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
