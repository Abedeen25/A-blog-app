import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import ShowPostComponent from "../components/ShowPostComponent";
import WritePostComponent from "../components/WritePostComponent";
import { getDataJson, getAllindex } from '../functions/AsyncstorageFunction';
import { AuthContext } from "../provider/AuthProvider"
import HeaderHome from "../components/HeaderComponent";



const HomeScreen = (props) => {

  const [Post, setPost] = useState([]);
  const [Render, setRender] = useState(false);


  const getPost = async () => {
    setRender(true);
    let keys = await getAllindex();
    let Allposts = [];
    if (keys != null) {
      for (let k of keys) {
        if (k.startsWith("pid#")) {
          let post = await getDataJson(k);
          Allposts.push(post);
        }
      }
      setPost(Allposts);
    }
    else {
      console.log("No post to show");
    }
    setRender(false);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.viewStyle}>

          <HeaderHome
            user={auth.CurrentUser.displayName}
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
              console.log(auth.CurrentUser)
            }}
          />

          <ImageBackground source={require('./../../assets/BG1.jpg')} style={styles.imageStyle}>

            <WritePostComponent user={auth.CurrentUser} />

            <FlatList
              data={Post}
              onRefresh={getPost}
              refreshing={Render}
              renderItem={function ({ item }) {
                return (
                  <ShowPostComponent title={item} user={auth.CurrentUser} link={props.navigation}
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

export default HomeScreen;