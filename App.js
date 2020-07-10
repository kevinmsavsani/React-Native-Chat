import Login from "./components/screens/Login";
import Chat from "./components/screens/Chat";
import CreateAccount from "./components/screens/CreateAccount";
import RoomOptions from "./components/screens/RoomOptions";

import { createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { YellowBox } from "react-native";
import _ from "lodash";

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
});

const App = createAppContainer(RootStack);

export default App;
