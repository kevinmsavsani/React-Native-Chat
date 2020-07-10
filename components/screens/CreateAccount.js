import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import FormInput from '../component/FormInput';
import FormButton from '../component/FormButton';
import firebaseSvc from "../../FirebaseSvc";

class CreateAccount extends React.Component {
  static navigationOptions = {
    title: "Group Chat",
  };

  state = {
    name: "",
    email: "",
    password: "",
  };

  onPressCreate = async () => {
    console.log("create account... email:" + this.state.email);
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log("create account failed. catch error:" + message);
    }
  };

  onChangeTextEmail = (email) => this.setState({ email });
  onChangeTextPassword = (password) => this.setState({ password });
  onChangeTextName = (name) => this.setState({ name });

  render() {
    return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Register to Group Chat</Title>
      <FormInput
        labelName='Name'
        onChangeText={this.onChangeTextName}
        value={this.state.name}
        />
      <FormInput
        labelName='Email'
        autoCapitalize='none'
        onChangeText={this.onChangeTextEmail}
        value={this.state.email}
        />
      <FormInput
        labelName='Password'
        secureTextEntry={true}
        onChangeText={this.onChangeTextPassword}
        value={this.state.password}
        />
      <FormButton
        title='Signup'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        onPress={this.onPressCreate}
        />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 18
  },
  navButton: {
    marginTop: 10
  }
});

export default CreateAccount;
