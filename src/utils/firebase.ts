// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA_Ux_sT3lLOVqD2CYJiRDEVUrBqGRhm0w',
  authDomain: 'amigoes4985.firebaseapp.com',
  projectId: 'amigoes4985',
  storageBucket: 'amigoes4985.appspot.com',
  messagingSenderId: '510730280591',
  appId: '1:510730280591:web:179ee1a9a082f4672e5afa',
  measurementId: 'G-HPBBZT3R3N',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized
}
//const analytics = getAnalytics(app);
const auth = firebase.auth();

export { auth };
