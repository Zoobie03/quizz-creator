import axios from 'axios';

const instance = axios.create(
  {
    baseURL: 'https://quizz-creator-default-rtdb.europe-west1.firebasedatabase.app/'
  }
)

export default instance;