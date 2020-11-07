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


const CommentScreen = (props) => {
  const content = props.route.params.content;

  const [Comment, setComment] = useState([]);
  const [Render, setRender] = useState(false);
  const getComment = async () => {
    setRender(true);
    let keys = await getAllindex();
    let Allcomments = [];
    if (keys != null) {
      for (let k of keys) {
        if (k.startsWith("cid#") && k.endsWith(content.pid)) {
          let comments = await getDataJson(k);
          Allcomments.push(comments);
        }
      }
      setComment(Allcomments);
    }
    else {
      console.log("No post to show");
    }
    setRender(false);
  }

  useEffect(() => {
    getComment();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.viewStyle}>

          <HeaderHome
            user={auth.CurrentUser.name}
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />

          <ImageBackground source={require('./../../assets/BG1.jpg')} style={styles.imageStyle}>

            <WriteCommentComponent user={auth.CurrentUser} postcontent={content} />

            <FlatList
              data={Comment}
              onRefresh={getComment}
              refreshing={Render}
              renderItem={function ({ item }) {
                return (
                  <ShowCommentComponent title={item}
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