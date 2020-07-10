import firebase from "firebase";
class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAQOpO07gnePdS6qMxm6479nT9fra5T_3s",
        authDomain: "rnfirebase-cc811.firebaseapp.com",
        databaseURL: "https://rnfirebase-cc811.firebaseio.com",
        projectId: "rnfirebase-cc811",
        storageBucket: "rnfirebase-cc811.appspot.com",
        messagingSenderId: "29318257515",
        appId: "1:29318257515:web:b4b2571a58c63826180a2e",
        measurementId: "G-DT5F4WNPMP",
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
