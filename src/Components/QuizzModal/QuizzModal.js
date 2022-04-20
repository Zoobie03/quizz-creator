// Library
import React, { useState, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Own files
import styles from './QuizzModal.module.css';
import { storage } from '../../config/firebase';
import LoadingSvg from '../../pictures/loading/LoadingSvg';
import { LoginContext } from '../../hoc/Contexts/LoginContext';

const QuizzModal = (props) => {
  // Context
  const { user } = useContext(LoginContext);
  // State
  const [URLpicture, setURLpicture] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [quizz, setQuizz] = useState({
  //   id: Math.random(),
  //   title: '',
  //   questions: [],
  //   tags: [],
  //   thematics: [],
  //   quizzPicture: null,
  // });

  // Variables
  const closedCross = (
    <svg
      width='2em'
      height='2em'
      viewBox='0 0 72 72'
      className={styles.CloseModal}
      onClick={props.onSvgClick}
    >
      <path
        fill='#ea5a47'
        d='m58.14 21.78l-7.76-8.013l-14.29 14.22l-14.22-14.22l-8.013 8.013L28.217 36l-14.36 14.22l8.014 8.013l14.22-14.22l14.29 14.22l7.76-8.013L43.921 36z'
      ></path>
      <path
        fill='none'
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        d='m58.14 21.78l-7.76-8.013l-14.29 14.22l-14.22-14.22l-8.013 8.013L28.207 36l-14.35 14.22l8.014 8.013l14.22-14.22l14.29 14.22l7.76-8.013L43.921 36z'
      ></path>
    </svg>
  );

  // Methods
  const handleChange = (event) => {
    const targetId = event.target.id;
    let value = event.target.value;

    let newState = { ...props.quizz };

    switch (targetId) {
      case 'title':
        newState.title = value;
        props.setQuizz(newState);
        break;
      case 'tags':
        newState.tags = value;
        props.setQuizz(newState);
        break;
      case 'thematics':
        newState.thematics = value;
        props.setQuizz(newState);
        break;
      default:
        break;
    }
  };

  // Upload picture
  const uploadForPreview = () => {
    setFileUploaded(false);

    const file = document.getElementById('quizzPicture').files[0];

    const ObjectURLFile = window.URL.createObjectURL(file);
    setURLpicture(ObjectURLFile);
  };

  // Firebase storage
  const uploadOnFirebaseStorage = async () => {
    setLoading(true);

    const file = document.getElementById('quizzPicture').files[0];
    const storageRef = ref(storage, `users/${user.uid}/quizz-pictures/${file.name}`);

    await uploadBytes(storageRef, file, file.name).then((snapshot) => {
      console.log('Uploaded file!');
      setFileUploaded(true);
      setLoading(false);
    });

    const photoURL = await getDownloadURL(storageRef);

    // Associer l'image au quizz
    props.setQuizz({
      ...props.quizz,
      quizzPicture: photoURL,
    });
  };

  return (
    <div className={`${styles.ContainerModal} ${props.modalIsOpen ? styles.animateIn : null}`}>
      {closedCross}
      <div className={styles.ModalContent}>
        <h1>Créer un quizz</h1>
        <div className={styles.wrapperModal}>
          <form>
            <label htmlFor='title'>Titre du quizz</label>
            <input type='text' value={props.quizz.title} onChange={handleChange} id='title' />
            <label htmlFor='thematics'>Thématiques (optionnel)</label>
            <input
              type='text'
              id='thematics'
              value={props.quizz.thematics}
              onChange={handleChange}
            />
            <label htmlFor='tags'>Tags (optionnel)</label>
            <input type='text' id='tags' value={props.quizz.tags} onChange={handleChange} />
            {/* Quizz picture */}
            <label htmlFor='quizzPicture'>Image du quizz</label>
            <div className={styles.fileUploader}>
              <input type='file' id='quizzPicture' onChange={uploadForPreview} />
              {loading ? (
                <LoadingSvg />
              ) : fileUploaded ? (
                <button className={styles.successButton}>Reçu !</button>
              ) : URLpicture ? (
                <button onClick={uploadOnFirebaseStorage}>Envoyer</button>
              ) : (
                <button className={styles.errorButton} disabled>
                  Aucun fichier sélectionné
                </button>
              )}
            </div>
            <button
              type='button'
              onClick={props.handleCreateQuizzClick}
              className={styles.submitButton}
            >
              Créer le quizz
            </button>
          </form>
          <div className={styles.picturePreview}>
            {URLpicture ? (
              <img id='picturePreview' src={URLpicture} alt='Preview' />
            ) : (
              <p>Aucun fichier choisi</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzModal;
