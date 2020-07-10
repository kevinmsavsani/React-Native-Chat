import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import firebaseSvc from "../FirebaseSvc";

import uuid from "uuid";

class Login extends React.Component {
  static navigationOptions = {
    title: "Group Chat",
  };

  state = {
    name: "",
    email: "",
    password: "",
  };

  // using Fire.js
  onPressLogin = async () => {
    console.log("pressing login... email:" + this.state.email);
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    const response = firebaseSvc.login(
      user,
      this.loginSuccess,
      this.loginFailed
    );
  };

  loginSuccess = () => {
    console.log("login successful, navigate to chat.");
    this.props.navigation.navigate("Chat", {
      name: this.state.name,
      email: this.state.email,
    });
  };
  loginFailed = () => {
    console.log("login failed ***");
    alert("Login failure. Please tried again.");
  };

  onChangeTextEmail = (email) => this.setState({ email });
  onChangeTextPassword = (password) => this.setState({ password });

  render() {
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder=""
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        <Button
          title="Login"
          style={styles.buttonText}
          onPress={this.onPressLogin}
        />

        <Button
          title="Create New Account"
          style={styles.buttonText}
          onPress={() => this.props.navigation.navigate("CreateAccount")}
        />
      </View>
      
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    margin: offset,
    marginLeft: offset,
    fontSize: 42,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default Login;
