import firebaseSvc from "../../FirebaseSvc";

/*This is an Example of Searchable Dropdown*/
import React, { Component } from 'react';
//import react in our project
import { View, Text } from 'react-native';
//import basic react native components
import SearchableDropdown from 'react-native-searchable-dropdown';
//import SearchableDropdown component

//Item array for the dropdown
var items = [
  //name key is must.It is to show the text in front
];

class JoinRoom extends React.Component {

  constructor() {
    super();
    this.state = {
      serverData: firebaseSvc.roomList(),
      //Data Source for the SearchableDropdown
    };
  }
  
  render() {
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <SearchableDropdown
          onTextChange={text => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={item => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '50%',
          }}
          items={this.state.serverData}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="placeholder"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
      </View>
    );
  }
}

export default JoinRoom;
