import React, { useState, useEffect } from "react";
import { ImageBackground, FlatList, View, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import { getDataJson, getAllindex } from '../functions/AsyncstorageFunction';
import NotificationComponent from '../components/NotificationComponent';
import { AuthContext } from "../provider/AuthProvider"
import HeaderHome from "../components/HeaderComponent";

const NotificationScreen = (props) => {
  const [Notification, setNotification] = useState([]);
  const [Render, setRender] = useState(false);
  const getNotification = async () => {
    setRender(true);
    let keys = await getAllindex();
    let Allnotifications = [];
    if (keys != null) {
      for (let k of keys) {
        if (k.startsWith("nid#")) {
          let notification = await getDataJson(k);
          Allnotifications.push(notification);
        }
      }
      setNotification(Allnotifications);
    }
    else {
      console.log("No post to show");
    }
    setRender(false);
  }


  useEffect(() => {
    getNotification();
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
            <FlatList
              data={Notification}
              onRefresh={getNotification}
              refreshing={Render}
              renderItem={function ({ item }) {
                if (item.author == auth.CurrentUser.name) {
                  return (
                    <NotificationComponent title={item} link={props.navigation} />
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