import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase/app';
// import 'firebase/database'; // If using Firebase database
// import 'firebase/storage';  // If using Firebase storage
import 'firebase/auth';

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();

  // Not logged in

//   const test = firebase.auth.Auth.Persistence.LOCAL;
//   console.log(test);
  const hasRememberedAccount = localStorage.getItem('remember_firebase_account');
  if (!hasRememberedAccount) { console.log('no account'); return null};

  // Logged in but current user is not fetched --> wait (10s)
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
      console.log('Reject timeout');
    }, 10000);

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            reject(null);
        }
        else{
            const token = await user.getIdToken();
            resolve(token);

            unregisterAuthObserver();
            clearTimeout(waitTimer);
        }
    });
  });
}

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {

  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response;
  }
  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;