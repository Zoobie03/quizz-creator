// Library
import React, { useContext, useReducer } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Own files
import styles from './QuizzModal.module.css';
import { storage } from '../../../config/firebase';
import LoadingSvg from '../../../pictures/loading/LoadingSvg';
import { LoginContext } from '../../../hoc/Contexts/LoginContext';
import { toast } from 'react-toastify';

const QuizzModal = (props) => {
  // Context
  const { user } = useContext(LoginContext);
  // State
  const initialState = {
    URLpicture: null,
    fileUploaded: false,
    loading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_URL_PICTURE':
        return { ...state, URLpicture: action.payload };
      case 'SET_FILE_UPLOADED':
        return { ...state, fileUploaded: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // const [URLpicture, setURLpicture] = useState(null);
  // const [fileUploaded, setFileUploaded] = useState(false);
  // const [loading, setLoading] = useState(false);

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
    // setFileUploaded(false);
    dispatch({ type: 'SET_FILE_UPLOADED', payload: false });

    const file = document.getElementById('quizzPicture').files[0];

    const ObjectURLFile = window.URL.createObjectURL(file);
    // setURLpicture(ObjectURLFile);
    dispatch({ type: 'SET_URL_PICTURE', payload: ObjectURLFile });
  };

  // Firebase storage
  const uploadOnFirebaseStorage = async () => {
    // setLoading(true);
    dispatch({ type: 'SET_LOADING', payload: true });

    const file = document.getElementById('quizzPicture').files[0];
    const storageRef = ref(
      storage,
      `users/${user.uid}/quizz-pictures/quizz-${props.userQuizzs.length}.jpg`
    );

    await uploadBytes(storageRef, file, file.name).then((snapshot) => {
      // console.log('Uploaded file!');
      // setFileUploaded(true);
      dispatch({ type: 'SET_FILE_UPLOADED', payload: true });
      toast.success("L'image de votre quizz a bien été uploadée !");
      // setLoading(false);
      dispatch({ type: 'SET_LOADING', payload: false });
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
            <label htmlFor='quizzPicture'>Image du quizz {props.userQuizzs.length}</label>
            <div className={styles.fileUploader}>
              <input type='file' id='quizzPicture' onChange={uploadForPreview} />
              {state.loading ? (
                <LoadingSvg />
              ) : state.fileUploaded ? (
                <button className={styles.successButton}>Reçu !</button>
              ) : state.URLpicture ? (
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
            {state.URLpicture ? (
              <img id='picturePreview' src={state.URLpicture} alt='Preview' />
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
