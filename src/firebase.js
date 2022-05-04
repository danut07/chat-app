import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAWh9LCvh5Bxtdn-d4yfZMJbPl2R4WFMfk",
    authDomain: "chatapp-3087f.firebaseapp.com",
    projectId: "chatapp-3087f",
    storageBucket: "chatapp-3087f.appspot.com",
    messagingSenderId: "567861596150",
    appId: "1:567861596150:web:94e811e77cfc06594d41d7",
  })
  .auth();
