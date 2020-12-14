import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, ScrollView, FlatList, View, StyleSheet } from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";

import WriteCommentComponent from "../components/WriteCommentComponent";
import ShowCommentComponent from "../components/ShowCommentComponent";
import { getDataJson, getAllindex } from '../functions/AsyncstorageFunction';
import { AuthContext } from "../provider/AuthProvider"
import HeaderHome from "../components/HeaderComponent";
import * as firebase from "firebase";
import 'firebase/firestore';


const CommentScreen = (props) => {
  const content = props.route.params.content;
  // console.log(content)

  const [Comment, setComment] = useState([]);
  const [Render, setRender] = useState(false);

  const CommentReaload = () => {
    firebase.firestore().collection("posts").doc(content.id).onSnapshot(function (doc) {
      let temp_body = doc.data();
      setComment(temp_body.comments.reverse())

    });
  }

  useEffect(() => {
    CommentReaload();
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

            <WriteCommentComponent user={auth.CurrentUser} postcontent={content} />

            <FlatList
              data={Comment}
              onRefresh={CommentReaload}
              refreshing={Render}
              renderItem={function ({ item }) {
                return (
                  <ShowCommentComponent com={item}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
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

export default CommentScreen;