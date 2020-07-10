import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import FormButton from "../component/FormButton";
import firebaseSvc from "../../FirebaseSvc";

type Props = {
  name?: string,
  email?: string,
};

class RoomOptions extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Group Chat",
  };

  // using Fire.js
  onPressGlobal = async () => {
    console.log(
      "pressing global... email:" + this.props.navigation.state.params.email
    );

    this.props.navigation.navigate("Chat", {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
    });
  };

  // using Fire.js
  onPressJoinRoom = async () => {
    console.log("pressing joinroom... email:" + this.state.email);
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    const response = firebaseSvc.joinRoom(
      user,
      this.joinRoomSuccess,
      this.joinRoomFailed
    );
  };

  joinRoomSuccess = () => {
    console.log("joinroom successful, navigate to chat.");
    this.props.navigation.navigate("Chat", {
      name: this.state.name,
      email: this.state.email,
    });
  };
  joinRoomFailed = () => {
    console.log("joinroom failed ***");
    alert("JoinRoom failure. Please tried again.");
  };

  // using Fire.js
  onPressCreateRoom = async () => {
    console.log("pressing createroom... email:" + this.state.email);
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    const response = firebaseSvc.createRoom(
      user,
      this.createRoomSuccess,
      this.createRoomFailed
    );
  };

  createRoomSuccess = () => {
    console.log("createroom successful, navigate to chat.");
    this.props.navigation.navigate("Chat", {
      name: this.state.name,
      email: this.state.email,
    });
  };
  createRoomFailed = () => {
    console.log("createroom failed ***");
    alert("CreateRoom failure. Please tried again.");
  };

  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Tell Your Choice</Title>

        <FormButton
          title="Global"
          modeValue="contained"
          labelStyle={styles.ButtonLabel}
          onPress={this.onPressGlobal}
        />

        <FormButton
          title="Join Room"
          modeValue="contained"
          labelStyle={styles.ButtonLabel}
          onPress={this.onPressJoinRoom}
        />

        <FormButton
          title="Add Room"
          modeValue="contained"
          labelStyle={styles.ButtonLabel}
          onPress={this.onPressCreateRoom}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  ButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});

export default RoomOptions;
