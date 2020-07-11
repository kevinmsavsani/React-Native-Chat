import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, IconButton } from "react-native-paper";
import FormInput from "../component/FormInput";
import FormButton from "../component/FormButton";
import firebaseSvc from "../../FirebaseSvc";
import PropTypes from "prop-types";


class AddRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Group Chat",
  };

  state = {
    name: "",
    password: "",
  };

  onPressCreate = async () => {
    console.log("create room... name:" + this.state.name);
    try {
      const room = {
        name: this.state.name,
        password: this.state.password,
      };
      await firebaseSvc.createRoom(room);

      this.props.navigation.navigate("RoomOptions", {
        name: this.props.navigation.state.params.name,
        email: this.props.navigation.state.params.email,
      });

    } catch ({ message }) {
      console.log("create room failed. catch error:" + message);
    }
  };

  onChangeTextPassword = (password) => this.setState({ password });
  onChangeTextName = (name) => this.setState({ name });

  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Add Group Room</Title>
        <FormInput
          labelName="Name"
          onChangeText={this.onChangeTextName}
          value={this.state.name}
        />
        <FormInput
          labelName="Password"
          secureTextEntry={true}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        <FormButton
          title="Create Room"
          modeValue="contained"
          labelStyle={styles.ButtonLabel}
          onPress={this.onPressCreate}
        />
      </View>
    );
  }
}

AddRoom.propTypes = {
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
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});

export default AddRoom;
