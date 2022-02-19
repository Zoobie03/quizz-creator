import { setDoc, getDoc, doc, db } from '../config/firebase';

export const checkValidity = (value, rules) => {
  let isValid = true;
  
  if (rules.required) {
    // Supprime les espaces avant et après la valeur
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.email) {
    const pattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
}

export const fetchDataOnFirestore = async (uid) => {
  const userDoc = doc(db, "users", uid);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log('Nothing found !');
    return;
  }
}

export const setDataOnFireStore = async (uid) => {
  // Route for the unique user doc
  const userDoc = doc(db, "users", uid);

  // Template of a newQuizz
  const newQuizz = {
    id: Math.random(),
    title: "",
    thematics: [],
    tags: [],
    questions: [],
  }

  fetchDataOnFirestore(uid)
    .then(userData => {
      setDoc(userDoc, {
        ...userData,
        quizzs: [...userData.quizzs, newQuizz]
      } , {merge: "true"});
    })
    .catch(error => {
      console.log(error);
    });
}