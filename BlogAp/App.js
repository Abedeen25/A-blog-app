import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import Home from "./src/pages/Home";
import SignUpScreen from "./src/pages/SignUpScreen";
import SignInScreen from "./src/pages/SignInScreen";


const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStackScreen = ()=>{
  return(
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={Home}/>
    </HomeStack.Navigator>
  );
};




const AuthStackScreen = ()=>{
  return(
    <AuthStack.Navigator initialRouteName='Sign In'>
      <AuthStack.Screen name='Sign In' component={SignInScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name='Sign Up' component={SignUpScreen} options={{headerShown:false}}/>
    </AuthStack.Navigator>
  );
};




function App(){
  return(
    <NavigationContainer>
      <AuthStackScreen/>
      {/* <HomeStackScreen/> */}
    </NavigationContainer>
  )
}

export default App;