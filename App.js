import Login from "./components/Login";
import Chat from "./components/Chat";

import { createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator({
  Login: Login,
  Chat: Chat,
});

const App = createAppContainer(RootStack);

export default App;
