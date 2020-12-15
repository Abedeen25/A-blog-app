import React, { useState, useEffect } from "react";
import { ImageBackground, View, ScrollView, StyleSheet, AsyncStorage, FlatList, Image } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons';
import { getDataJson, getAllindex, removeData } from '../functions/AsyncstorageFunction';
import PostlistComponent from "../components/PostListComponent";
import { AuthContext } from "../provider/AuthProvider";
import HeaderHome from "../components/HeaderComponent";
import ShowPostComponent from "../components/ShowPostComponent";
import * as firebase from "firebase";
import 'firebase/firestore';


const ProfileScreen = (props) => {

  const [Post, setPost] = useState([]);
  const [Profiles, setProfiles] = useState([]);
  const [Render, setRender] = useState(false);

  const getData = async () => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        let temp_users = [];
        querySnapshot.forEach((doc) => {
          temp_users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setProfiles(temp_users);
        //setLoading(false);
      }
        , (error) => {
          //setLoading(false);
          alert(error);
        });
  }
  const getPost = async () => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("posted_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_users = [];
        querySnapshot.forEach((doc) => {
          temp_users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPost(temp_users);
        //setLoading(false);
      }
        , (error) => {
          //setLoading(false);
          alert(error);
        });
  }

  useEffect(() => {
    getPost();
    getData();
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
            <Card>
              <Image style={styles.imageStyle1} source={require('./../../assets/User.jpg')} />
              <Text style={styles.NameStyle}> {auth.CurrentUser.displayName}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 40 }}>
                <Button
                  type="solid"
                  title=" Edit Account "
                  onPress={
                    function () {
                      props.navigation.navigate('EditProfile', { title: auth.CurrentUser });
                    }
                  }
                />
                <Button
                  type="solid"
                  title=" Delete Account "
                  onPress={async () => {
                    firebase.auth().deleteUser(auth.CurrentUser.uid).then(() => {
                      console.log('Successfully deleted user');
                      auth.setIsloggedIn(false);
                      auth.setCurrentUser({});
                    }).catch((error) => {
                      console.log('Error deleting user:', error);
                    });
                  }
                  }
                />

              </View>


              <FlatList
                data={Profiles}
                renderItem={function ({ item }) {
                  console.log(item);
                  if (auth.CurrentUser.uid == item.id) {
                    return (
                      <View>
                        <Text style={styles.textStyle1}>  Born On :  {item.data.dateOfBirth}</Text>
                        <Text style={styles.textStyle1}>  Lives At :  {item.data.address}</Text>
                        <Text style={styles.textStyle1}>  Works At :  {item.data.workPlace}</Text>
                      </View>
                    );
                  }
                }}
              />


            </Card>
            <Card>
              <Text style={{ fontSize: 18, color: 'dodgerblue', textAlign: 'center' }}>↓ ↓ ↓ Your Posts ↓ ↓ ↓</Text>
            </Card>

            <FlatList
              data={Post}
              onRefresh={getPost}
              refreshing={Render}
              renderItem={function ({ item }) {
                console.log(item);
                if (item.data.userId == auth.CurrentUser.uid) {
                  return (
                    <ShowPostComponent postBody={item} LocalUser={auth.CurrentUser.displayName} nav={props} />
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