import firebaseSvc from "../../FirebaseSvc";

/*This is an Example of Searchable Dropdown*/
import React, { Component } from "react";
//import react in our project
import { View, Text, StyleSheet, TextInput } from "react-native";
//import basic react native components
import SearchableDropdown from "react-native-searchable-dropdown";
//import SearchableDropdown component
import FormInput from "../component/FormInput";
import FormButton from "../component/FormButton";
import PropTypes from "prop-types";

//Item array for the dropdown
var items = [
  //name key is must.It is to show the text in front
];

class JoinRoom extends React.Component {
  state = {
    name: "",
    password: "",
  };
  static navigationOptions = {
    title: "Group Chat",
  };

  constructor() {
    super();
    this.state = {
      serverData: firebaseSvc.roomList(),
      //Data Source for the SearchableDropdown
    };
  }

  onPressJoin = async () => {

    var n = this.state.name.password.localeCompare(this.state.password);
    console.log(n);
    if (n == 0) {
      console.log("join successful, navigate to Room Chat " + this.state.name.id);
      this.props.navigation.navigate("RoomChat", {
        name: this.props.navigation.state.params.name,
        email: this.props.navigation.state.params.email,
        id: this.state.name.id
      });
    } else {
      console.log("join failed ***");
      alert("Room Join failure. Please try again.");
    }
  };

  onChangeTextPassword = (password) => this.setState({ password });
  onChangeTextName = (name) => this.setState({ name });

  render() {
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => {
              this.onChangeTextName(item),
              console.log(this.state.name);
          }}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#FAF7F6",
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: "#FAF9F8",
            borderColor: "#bbb",
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: "#222",
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: "80%",
          }}
          items={this.state.serverData}
          //mapping of item array
          defaultIndex={0}
          //default selected item index
          placeholder="Enter Room Name"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
         <TextInput
          placeholder="Password"
          onChangeText={this.onChangeTextPassword}
          underlineColorAndroid="transparent"
          style={styles.textInputStyle}
          value={this.state.password}
          secureTextEntry={true}
        />
        <FormButton
          title="Join Room"
          modeValue="contained"
          labelStyle={styles.ButtonLabel}
          onPress={this.onPressJoin}
        />
      </View>
    );
  }
}

JoinRoom.propTypes = {
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
  textInputStyle: {
    //inserted text style
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#FAF7F6",
    marginHorizontal: 5
  }
});

export default JoinRoom;
