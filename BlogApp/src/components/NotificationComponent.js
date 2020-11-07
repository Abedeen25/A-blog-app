import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { getDataJson, getAllindex } from '../functions/AsyncstorageFunction';

const NotificationComponent = (props) => {
  let post = getDataJson(props.title.pid);
  let notation;
  let bcolor;
  let nm;
  if (props.title.type == "like") {
    notation = "Liked";
    bcolor = "dodgerblue";
    nm = "heart";
  }
  else {
    notation = "Commented to";
    bcolor = "#ffab91";
    nm = "pencil";
  }
  return (
    <TouchableOpacity onPress={function () {
      props.link.navigate('Comment', { content: post._W });
      console.log(post._W);
    }}>
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            containerStyle={{ backgroundColor: bcolor }}
            rounded
            icon={{
              name: nm,
              type: "font-awesome",
              color: "white",
              size: 18,
            }}
            activeOpacity={1}
          />
          <Text style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>{props.title.uname} </Text> {notation} Your Post.
      </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default NotificationComponent;
