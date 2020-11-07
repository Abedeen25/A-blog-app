import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const ShowCommentComponent = (props) => {
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text h4Style={{ padding: 10, paddingLeft: 0 }} h4>
          {props.title.uname}
        </Text>
      </View>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.title.comment}
      </Text>
      <Text h6Style={{ padding: 10 }} h6
        style={{ alignSelf: "flex-end", color: 'gray' }}>
        {props.title.time}, {props.title.date}
      </Text>
    </Card>
  );
};

export default ShowCommentComponent;