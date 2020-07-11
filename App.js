import Login from "./components/screens/Login";
import Chat from "./components/screens/Chat";
import CreateAccount from "./components/screens/CreateAccount";
import RoomOptions from "./components/screens/RoomOptions";
import AddRoom from "./components/screens/AddRoom";
import JoinRoom from "./components/screens/JoinRoom";

import { createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { YellowBox } from "react-native";
import _ from "lodash";
import RoomChat from "./components/screens/RoomChat";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const RootStack = createStackNavigator({
  Login: { screen: Login },
  CreateAccount: { screen: CreateAccount },
  RoomOptions: { screen: RoomOptions },
  Chat: { screen: Chat },
  AddRoom: { screen: AddRoom },
  JoinRoom: { screen: JoinRoom},
  RoomChat: { screen: RoomChat}
});

const App = createAppContainer(RootStack);

export default App;
