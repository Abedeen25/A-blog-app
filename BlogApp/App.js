import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Home from "./src/pages/Home";
import NotificationPage from "./src/pages/NotificationPage"
import SignUpScreen from "./src/pages/SignUpScreen";
import SignInScreen from "./src/pages/SignInScreen";
import { AuthContext, AuthProvider } from './src/provider/AuthProvider';


const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();


const HomeTabs = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) =>
            focused ? (<AntDesign name="home" color="white" size={24} />) : (<AntDesign name="home" color="#80c6ff" size={24} />)
        }} />
      <HomeTab.Screen
        name="Notifcations"
        component={NotificationPage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) =>
            focused ? (<MaterialIcons name="notifications-none" size={24} color="white" />) : (<MaterialIcons name="notifications-none" size={24} color="#80c6ff" />)
        }} />
    </HomeTab.Navigator>
  );
};


const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName='Sign In'>
      <AuthStack.Screen name='Sign In' component={SignInScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name='Sign Up' component={SignUpScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
};




function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (<NavigationContainer>
          {auth.IsLoggedIn ? <HomeTabs /> : <AuthStackScreen />}
        </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>
  )
}

export default App;