import React, { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { storeDataJson, mergeData, removeData } from '../functions/AsyncstorageFunction';
import { AntDesign } from "@expo/vector-icons";

const ShowPostComponent = (props) => {
  const [Like, setLike] = useState(props.data.likes.length);
  let like = " (" + Like + ")";
  const comment = "Comment";
  let today = new Date().toLocaleDateString();
  let currenttime = new Date().toLocaleTimeString();

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
          {props.data.author}
        </Text>
      </View>
      <Text h6Style={{ padding: 10 }} h6 style={{ alignSelf: "stretch", color: 'gray' }}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}>Posted at: </Text>{props.title.time}, {props.title.date}
      </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.title.post}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title={like}
          icon={<AntDesign name="heart" size={24} color="dodgerblue" />}
          onPress={
            async function () {
              let lcount = (Like + 1)
              await mergeData(props.title.pid, JSON.stringify({ likecount: lcount }))
              const id = Math.ceil(Math.random() * 1000000000000000);
              let newnotification = {
                pid: props.title.pid,
                nid: "nid#" + id + props.title.pid,
                author: props.title.uname,
                uname: props.user.name,
                date: today,
                time: currenttime,
                type: "like",
              }
              storeDataJson("nid#" + id + props.title.pid, newnotification);
              console.log(newnotification);
              console.log(props.title);
              setLike(Like + 1);
            }
          }
        />
        <Button type="solid" title={comment} onPress={
          function () {
            props.link.navigate('Comment', { content: props.title });
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