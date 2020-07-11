import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import PropTypes from "prop-types";
import firebase from "firebase";

import firebaseSvc from "../../FirebaseSvc";
const config = {
  apiKey: "AIzaSyAQOpO07gnePdS6qMxm6479nT9fra5T_3s",
  authDomain: "rnfirebase-cc811.firebaseapp.com",
  databaseURL: "https://rnfirebase-cc811.firebaseio.com",
  projectId: "rnfirebase-cc811",
  storageBucket: "rnfirebase-cc811.appspot.com",
  messagingSenderId: "29318257515",
  appId: "1:29318257515:web:b4b2571a58c63826180a2e",
  measurementId: "G-DT5F4WNPMP",
};
class RoomChat extends React.Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      console.log("firebase apps already running...");
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Room Chat",
  });

  state = {
    messages: [],
    id: this.props.navigation.state.params.id,
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSvc.sendRoom}
        user={this.user}
      />
    );
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

  // sendRoom = () => {
  //   var refrooms = firebase.database().ref("rooms/15/Messages");
  //   for (let i = 0; i < this.state.messages.length; i++) {
  //     const { text, user } = this.state.messages[i];
  //     const message = {
  //       text,
  //       user,
  //       createdAt: this.timestamp,
  //     };
  //     refrooms.push(message);
  //   }
  // };

  refroomOn = (callback) => {
    console.log("rooms/" + this.state.id.toString() + "/Messages");
    firebase
      .database()
      .ref("rooms/" + this.state.id.toString() + "/Messages")
      .limitToLast(50)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  componentDidMount() {
    this.refroomOn((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
}

RoomChat.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
};

export default RoomChat;
