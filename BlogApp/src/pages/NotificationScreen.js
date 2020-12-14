import React, { useState, useEffect } from "react";
import { ImageBackground, FlatList, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";
import { getDataJson, getAllindex } from '../functions/AsyncstorageFunction';
import NotificationComponent from '../components/NotificationComponent';
import { AuthContext } from "../provider/AuthProvider"
import HeaderHome from "../components/HeaderComponent";
import * as firebase from "firebase";
import 'firebase/firestore';

const NotificationScreen = (props) => {

  const [Post, setPost] = useState([]);
  const [Render, setRender] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);


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
        <View style={styles.viewStyle}>
          <HeaderHome
            user={auth.CurrentUser.displayName}
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <ImageBackground source={require('./../../assets/BG1.jpg')} style={styles.imageStyle}>
            <FlatList
              data={Post}
              onRefresh={loadPosts}
              refreshing={Render}
              renderItem={function ({ item }) {
                if (item.data.userId == auth.CurrentUser.uid) {
                  return (
                    <NotificationComponent post={item} link={props.navigation} />

                  );
                }
              }}
              keyExtractor={(item, index) => index.toString()}
            >
            </FlatList>

          </ImageBackground>
        </View>
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

export default NotificationScreen;