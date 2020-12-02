import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ8tB_gDFMLG5g0yGpkYrp1JtbTqv5O2Y",
  authDomain: "iot-projke.firebaseapp.com",
  databaseURL: "https://iot-projke.firebaseio.com",
  projectId: "iot-projke",
  storageBucket: "iot-projke.appspot.com",
  messagingSenderId: "907794801836",
  appId: "1:907794801836:web:580c12f882634df7dd2b09",
  measurementId: "G-MKTVTXZGH1"
};

firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.database();
const auth = firebase.auth();

export {
    auth,
    db,
}