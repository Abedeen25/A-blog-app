import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { getDataJson, getAllindex } from '../functions/AsyncstorageFunction';

const NotificationComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.link.navigate('Comment', { content: props.post });
      }}>


      <Card>

        <Text style={{ fontStyle: "italic", fontSize: 20 }}>{props.post.data.post}</Text>


        <FlatList
          data={props.post.data.comments}
          renderItem={function ({ item }) {
            return (
              <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4, marginTop: 5 }}>
                <Avatar
                  containerStyle={{ backgroundColor: '#0D75E7' }}
                  rounded
                  icon={{
                    name: 'pencil',
                    type: "font-awesome",
                    color: "white",
                    size: 18,
                  }}
                  activeOpacity={1}
                />
                <Text style={{ paddingHorizontal: 10 }}>
                  <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>{item.commentor} </Text> Commented on This Post.
                  </Text>
              </View>

            );
          }
          }
        />

        <FlatList
          data={props.post.data.likes}
          renderItem={function ({ item }) {
            return (
              <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4, marginTop: 5 }}>
                <Avatar
                  containerStyle={{ backgroundColor: '#de507d' }}
                  rounded
                  icon={{
                    name: 'heart',
                    type: "font-awesome",
                    color: "white",
                    size: 18,
                  }}
                  activeOpacity={1}
                />
                <Text style={{ paddingHorizontal: 10 }}>
                  <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>{item} </Text> Liked This Post.
                  </Text>
              </View>

            );
          }
          }
        />

      </Card>

    </TouchableOpacity>
  );
}

export default NotificationComponent;
