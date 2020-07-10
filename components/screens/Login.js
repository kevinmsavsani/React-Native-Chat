import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import FormInput from "../component/FormInput";
import FormButton from "../component/FormButton";
import firebaseSvc from "../../FirebaseSvc";

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
    this.props.navigation.navigate("RoomOptions", {
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
      <View style={styles.container}>
        <Title style={styles.titleText}>Welcome to Group Chat</Title>
        <FormInput
          labelName="Email"
          autoCapitalize="none"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        <FormInput
          labelName="Password"
          secureTextEntry={true}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        <FormButton
          title="Login"
          modeValue="contained"
          labelStyle={styles.loginButtonLabel}
          onPress={this.onPressLogin}
        />
        <FormButton
          title="New user? Join here"
          modeValue="text"
          uppercase={false}
          labelStyle={styles.navButtonText}
          onPress={() => this.props.navigation.navigate("CreateAccount")}
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
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
});

export default Login;
