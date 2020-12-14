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
          {props.com.commentor}
        </Text>
      </View>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.com.message}
      </Text>
      <Text h6Style={{ padding: 10 }} h6
        style={{ alignSelf: "flex-end", color: 'gray' }}>
        {props.com.time.toDate().toDateString().toString()}
      </Text>
    </Card>
  );
};

export default ShowCommentComponent;