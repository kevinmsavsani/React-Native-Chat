import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import PropTypes from "prop-types";
import firebase from "firebase";

import firebaseSvc from "../../FirebaseSvc";

class RoomChat extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Room Chat",
  });

  state = {
    messages: [],
    id: this.props.navigation.state.params.id
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

  refroomOn = (callback) => {
    firebase.database().ref("rooms/"+this.state.id+"/Messages")
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
  id: PropTypes.string
};

export default RoomChat;
