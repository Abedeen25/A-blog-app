import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Header } from "react-native-elements";
import ShowPostComponent from "../components/ShowPostComponent";
import WritePostComponent from "../components/WritePostComponent";
import { getDataJson, getAllindex } from '../functions/AsyncstorageFunction';
import { AuthContext } from "../provider/AuthProvider"
import HeaderHome from "../components/HeaderComponent";
import * as firebase from "firebase";
import 'firebase/firestore';
import { View } from "react-native";



const HomeScreen = (props) => {

  const [Post, setPost] = useState([]);
  const [Render, setRender] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  // const loadPosts = () => {
  //   setIsLoading(true);
  //   firebase.firestore().collection("posts").orderBy("posted_at", "desc").onSnapsho(function (querySnapshot) {
  //     let temp_loader = [];
  //     querySnapshot.forEach(function (doc) {
  //       temp_loader.push({
  //         id: doc.id,
  //         data: doc.data(),
  //       })
  //     });
  //     setPost(temp_loader);
  //     setIsLoading(false);
  //   }).catch((error) => {
  //     setIsLoading(false);
  //     alert(error);
  //   })
  // };

  const loadPosts = async () => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("posted_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPost(temp_posts);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      });
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

            {IsLoading ? <ActivityIndicator size="large" color="#20C6DC" animating={true} /> : <FlatList
              data={Post}
              onRefresh={loadPosts}
              refreshing={Render}
              renderItem={function ({ item }) {
                return (
                  <ShowPostComponent postBody={item} />
                );
              }}
            // keyExtractor={(item, index) => index.toString()}
            />
            }

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