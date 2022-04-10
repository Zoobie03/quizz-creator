// Library
import React from 'react';
// Own files
import logo from '../../../pictures/logo.png';
import styles from './AddQuestion.module.css';

const AddQuestion = () => {
  // State
  const [question, setQuestion] = React.useState([]);

  return <div className={styles.AddQuestion}></div>;
};

export default AddQuestion;
