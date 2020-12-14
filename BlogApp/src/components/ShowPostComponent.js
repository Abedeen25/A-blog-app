import React, { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { storeDataJson, mergeData, removeData } from '../functions/AsyncstorageFunction';
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import 'firebase/firestore';

const ShowPostComponent = (props) => {
  const [Like, setLike] = useState(props.postBody.data.likes.length);
  let like = " (" + Like + ")";
  const comment = "Comment";
  // console.log(props.postBody)
  // console.log(props.LocalUser)

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#9AF1ED" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "#0166DA" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.postBody.data.author}
        </Text>
      </View>
      <Text h6Style={{ padding: 10 }} h6 style={{ alignSelf: "stretch", color: 'gray' }}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}>Posted at: </Text>{props.postBody.data.posted_at.toDate().toDateString().toString()}
      </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.postBody.data.post}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title={like}
          icon={<AntDesign name="heart" size={24} color="dodgerblue" />}
          onPress={
            function () {
              firebase.firestore().collection("posts").doc(props.postBody.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(props.LocalUser)
              });
            }
          }
        />
        <Button type="solid" title={comment} onPress={
          function () {
            props.nav.navigation.navigate('Comment', { content: props.postBody });
          }
        } />

        {/* <Button type="solid" title="Remove" onPress={
          async function(){
          await removeData((props.title.pid));
          }
        }/> */}

      </View>
    </Card>
  );
};

export default ShowPostComponent;