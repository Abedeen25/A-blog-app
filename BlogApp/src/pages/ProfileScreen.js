import React, { useState, useEffect } from "react";
import { ImageBackground, View, ScrollView, StyleSheet, AsyncStorage, FlatList, Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons';
import { getDataJson, getAllindex, removeData } from '../functions/AsyncstorageFunction';
import PostlistComponent from "../components/PostListComponent";
import { AuthContext } from "../provider/AuthProvider";
import HeaderHome from "../components/HeaderComponent";


const ProfileScreen = (props) => {

  const [Post, setPost] = useState([]);
  const [Render, setRender] = useState(false);

  const deleteprofile = async (name, email) => {
    let flag = false
    let index = await getAllindex();
    if (index != null) {
      for (let i of index) {
        if (i.endsWith(name)) {
          await removeData((i));
        }
      }
    }
    await removeData((email));
    return flag;
  }

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
        <View style={styles.viewStyle}>
          <HeaderHome
            user={auth.CurrentUser.name}
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />


          <ImageBackground source={require('./../../assets/BG1.jpg')} style={styles.imageStyle}>
            <Card>
              <Image style={styles.imageStyle1} source={require('./../../assets/User.jpg')} />
              <Text style={styles.NameStyle}> {auth.CurrentUser.name}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 40 }}>
                <Button
                  type="solid"
                  title=" Edit Account "
                  onPress={
                    function () {
                      props.navigation.navigate('EditProfile');
                    }
                  }
                />
                <Button
                  type="solid"
                  title=" Delete Account "
                  onPress={async () => {
                    let del = await deleteprofile(auth.CurrentUser.name, auth.CurrentUser.email);
                    if (del == false) {
                      alert("User Removed Successfully");
                      auth.setIsloggedIn(false);
                      auth.setCurrentUser({});
                    }
                    else {
                      alert("Delete action unsuccessful");
                    }
                  }
                  }
                />


              </View>
              <Text style={styles.textStyle1}>  Born On : {auth.CurrentUser.dateOfBirth}</Text>
              <Text style={styles.textStyle1}>  Lives At : {auth.CurrentUser.address}</Text>
              <Text style={styles.textStyle1}>  Works At : {auth.CurrentUser.workPlace}</Text>
            </Card>

            <FlatList
              data={Post}
              onRefresh={getPost}
              refreshing={Render}
              renderItem={function ({ item }) {
                if (item.uname == auth.CurrentUser.name) {
                  return (
                    <PostlistComponent title={item} user={auth.CurrentUser}
                    />
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
  textStyle1: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  NameStyle: {
    fontSize: 25,
    color: 'black',
    alignSelf: 'center',
    margin: 10,
  },
  imageStyle1: {
    height: 120,
    width: 85,
    alignSelf: 'center',
    marginTop: 40,
  },
});

export default ProfileScreen;