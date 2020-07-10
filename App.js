import Login from "./components/Login";
import Chat from "./components/Chat";
import CreateAccount from './components/CreateAccount';

import { createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator({
  Login: { screen: Login },
  CreateAccount: { screen: CreateAccount },
  Chat: { screen: Chat },
});

const App = createAppContainer(RootStack);

export default App;