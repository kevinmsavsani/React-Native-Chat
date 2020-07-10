import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
// add import
import firebaseSvc from "../FirebaseSvc";

export default class Login extends React.Component {
  // add state to store user input
  state = {
    email: "test@live.com",
    password: "123456",
  };
  // add login method to handle user press Login button
  onPressLogin = async () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    firebaseSvc.login(user, this.loginSuccess, this.loginFailed);
  };
  loginSuccess = () => {
    console.log("login successful, navigate to chat.");
    this.props.navigation.navigate("Chat", {
      name: this.state.name,
      email: this.state.email,
    });
  };
  loginFailed = () => {
    alert("Login failure. Please tried again.");
  };
  // methods to handle user input and update the state
  onChangeTextEmail = (email) => this.setState({ email });
  onChangeTextPassword = (password) => this.setState({ password });

  render() {
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="test@live.com"
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
          title="Login 2"
          style={styles.buttonText}
          onPress={this.onPressLogin}
        />
        <Button
          title="Go to create new account"
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
    marginLeft: offset,
    fontSize: 42,
  },
});
