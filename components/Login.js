import React from "react";
import { Text, View, Button } from "react-native";
export default class Login extends React.Component {
  render() {
    return (
      <View>
        <Text>My Login Screen</Text>
        <Button
          title="Navigate to Chat"
          onPress={() => this.props.navigation.navigate("Chat")}
        />
      </View>
    );
  }
}
