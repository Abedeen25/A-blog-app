import React, { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { storeDataJson, mergeData, removeData } from '../functions/AsyncstorageFunction';
import { AntDesign } from "@expo/vector-icons";

const PostlistComponent = (props) => {

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
          {props.title.uname}
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
      <Text h6Style={{ padding: 10 }} h6 style={{ color: 'gray' }}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}>Likes: </Text>{props.title.likecount}
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}> , Comments: </Text>{props.title.commentcount}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>

        <Button type="solid" title="Remove" onPress={
          async function () {
            await removeData((props.title.pid));
          }
        } />
      </View>
    </Card>
  );
};

export default PostlistComponent;