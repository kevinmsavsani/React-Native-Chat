import firebase from "firebase";
import uuid from "uuid";

const config = {
  apiKey: "AIzaSyDb9qiZE7li0dnuuj_WKuK5L82IZl3Xmxw",
  authDomain: "fir-6fe6a.firebaseapp.com",
  databaseURL: "https://fir-6fe6a.firebaseio.com",
  projectId: "fir-6fe6a",
  storageBucket: "fir-6fe6a.appspot.com",
  messagingSenderId: "668784332849",
  appId: "1:668784332849:web:5914215bbb8855f2ee0510",
  measurementId: "G-CTGM67NC9G"
};

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      console.log("firebase apps already running...");
    }
  }

  login = async (user, success_callback, failed_callback) => {
    console.log("logging in");
    const output = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        this.login(user);
      } catch ({ message }) {
        console.log("Failed:" + message);
      }
    } else {
      console.log("Reusing auth...");
    }
  };

  createAccount = async (user) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function () {
          console.log(
            "created user successfully. User email:" +
              user.email +
              " name:" +
              user.name
          );
          var userf = firebase.auth().currentUser;
          userf.updateProfile({ displayName: user.name }).then(
            function () {
              console.log(
                "Updated displayName successfully. name:" + user.name
              );
              alert(
                "User " + user.name + " was created successfully. Please login."
              );
            },
            function (error) {
              console.warn("Error update displayName.");
            }
          );
        },
        function (error) {
          console.error(
            "got error:" + typeof error + " string:" + error.message
          );
          alert("Create account failed. Error: " + error.message);
        }
      );
  };

  onLogout = (user) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Sign-out successful.");
      })
      .catch(function (error) {
        console.log("An error happened when signing out");
      });
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("Messages");
  }

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  refOn = (callback) => {
    this.ref
      .limitToLast(50)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // send the message to the Backend
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  sendRoom = (messagesR) => {
    console.log(id);
    var refroom = firebase.database().ref("rooms/0/Messages");
    for (let i = 0; i < messagesR.length; i++) {
      const { text, user } = messagesR[i];
      const messageR = {
        text,
        user,
        createdAt: this.timestamp,
      };
      refroom.push(messageR);
    }
  };

  refOff() {
    this.ref.off();
  }

  createRoom = (room) => {
    var current = 0;
    firebase
      .database()
      .ref("RoomNumber")
      .on("value", function (snapshot) {
        current = snapshot.val();
      });
    var usersRef = firebase.database().ref("rooms");
    usersRef.child(current).set({
      id: current,
      name: room.name,
      password: room.password,
    });

    firebaseSvc.setRoomNumber();
  };

  roomList() {
    var refs = firebase.database().ref("rooms");
    var json = [];
    refs.orderByChild("name").on("child_added", function (snapshot) {
      json.push({
        id: snapshot.val().id,
        name: snapshot.val().name,
        password: snapshot.val().password,
      });
    });
    return json;
  }

  getRoomNumber(callback) {
    var ref = firebase.database().ref("RoomNumber");

    ref.on(
      "value",
      function (snapshot) {
        var peep = snapshot;
        // error will be null, and peep will contain the snapshot
        callback(null, peep);
      },
      function (error) {
        // error wil be an Object
        callback(error);
      }
    );
    // firebaseSvc.getRoomNumber(function (err, result) {
    //   console.log(result);
    // });
    // firebaseSvc.setRoomNumber();
  }

  setRoomNumber() {
    var ref = firebase.database().ref("RoomNumber");
    ref.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
