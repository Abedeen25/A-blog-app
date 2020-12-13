import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import ShowPostComponent from "../components/ShowPostComponent";
import WritePostComponent from "../components/WritePostComponent";
import { getDataJson, getAllindex } from '../functions/AsyncstorageFunction';
import { AuthContext } from "../provider/AuthProvider"
import HeaderHome from "../components/HeaderComponent";
import * as firebase from "firebase";
import 'firebase/firestore';



const HomeScreen = (props) => {

  const [Post, setPost] = useState([]);
  const [Render, setRender] = useState(false);

  const loadPosts = () => {
    setRender(true);
    firebase.firestore().collection("posts").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
      });
    });
    setRender(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.viewStyle}>

          <HeaderHome
            user={auth.CurrentUser.displayName}
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />

          <ImageBackground source={require('./../../assets/BG1.jpg')} style={styles.imageStyle}>

            <WritePostComponent user={auth.CurrentUser} />

            <FlatList
              data={Post}
              onRefresh={loadPosts}
              refreshing={Render}
              renderItem={function ({ item }) {
                return (
                  // <ShowPostComponent postBody={item} />
                  <View><Text>Some message</Text></View>
                );
              }}
            // keyExtractor={(item, index) => index.toString()}
            >
            </FlatList>

          </ImageBackground>

        </SafeAreaView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default HomeScreen;