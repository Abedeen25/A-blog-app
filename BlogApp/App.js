import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { AuthContext, AuthProvider } from './src/provider/AuthProvider';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import HomeScreen from './src/pages/HomeScreen';
import NotificationScreen from './src/pages/NotificationScreen';
import SignupScreen from './src/pages/SignUpScreen';
import SigninScreen from './src/pages/SignInScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import CommentScreen from './src/pages/CommentScreen';
import EditProfileScreen from './src/pages/EditProfileScreen';
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDpudOdQMUBpwjIUQTfWy0FbnxXcHj2Ha0",
  authDomain: "blog-app-e7e73.firebaseapp.com",
  projectId: "blog-app-e7e73",
  storageBucket: "blog-app-e7e73.appspot.com",
  messagingSenderId: "512802133010",
  appId: "1:512802133010:web:fc47a745ca4ac63e33b4cb"
};
// Initialize Firebase
if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName='Signin'>
      <AuthStack.Screen name='SignIn' component={SigninScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name='SignUp' component={SignupScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

const HomeTabScreen = () => {
  return (
    < HomeTab.Navigator initialRouteName='Home'>
      < HomeTab.Screen name='Home' component={HomeScreen} options={{
        headerShown: false, tabBarLabel: "Home",
        tabBarIcon: ({ focused }) =>
          focused ? (<AntDesign name="home" color="white" size={24} />) : (<AntDesign name="home" color="#80c6ff" size={24} />)
      }} />

      < HomeTab.Screen name="Notification" component={NotificationScreen} options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ focused }) =>
          focused ? (<MaterialIcons name="notifications-none" size={24} color="white" />) : (<MaterialIcons name="notifications-none" size={24} color="#80c6ff" />)
      }}
      />

    </ HomeTab.Navigator>
  );
}


const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={HomeTabScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='Comment' component={CommentScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )

}

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator initialRouteName='Profile'>
      <ProfileStack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name='EditProfile' component={EditProfileScreen} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  )

}


const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeStackScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileStackScreen} />

    </AppDrawer.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer >
            {auth.IsloggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
