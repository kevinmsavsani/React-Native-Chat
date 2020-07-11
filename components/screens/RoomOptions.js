import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import FormButton from "../component/FormButton";
import firebaseSvc from "../../FirebaseSvc";
import PropTypes from "prop-types";


class RoomOptions extends React.Component {
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
    console.log(
      "pressing global... email:" + this.props.navigation.state.params.email
    );

    this.props.navigation.navigate("JoinRoom", {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
    });
  };

  // using Fire.js
  onPressCreateRoom = async () => {
    console.log(
      "pressing Add Room... email:" + this.props.navigation.state.params.email
    );

    this.props.navigation.navigate("AddRoom", {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
    });
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

RoomOptions.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

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
