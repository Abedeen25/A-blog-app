import React, { useReducer, useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { storeDataJson, mergeData } from '../functions/AsyncstorageFunction';
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";
import 'firebase/firestore';


const WriteCommentComponent = (props) => {
  const [Commentno, setCommentno] = useState(props.postcontent.commentcount);
  const [Comment, setComment] = useState("");
  const input = React.createRef();
  let today = new Date().toLocaleDateString();
  let currenttime = new Date().toLocaleTimeString();

  return (
    <Card style={{ paddingLeft: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar
          containerStyle={{ backgroundColor: "#9AF1ED" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "#0166DA" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.postcontent.data.author}
        </Text>
      </View>
      <Text h6Style={{ padding: 10 }} h6 style={{ alignSelf: "stretch", color: 'gray' }}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}>Posted at: </Text>{props.postcontent.data.posted_at.toDate().toDateString().toString()}
      </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.postcontent.data.post}
      </Text>
      <Text h6Style={{ padding: 10 }} h6 style={{ color: 'gray' }}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}>Likes: </Text>{props.postcontent.data.likes.length}
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}> , Comments: </Text>{props.postcontent.data.comments.length}
      </Text>
      <Input
        ref={input}
        placeholder="Write Something"
        leftIcon={<Entypo name="pencil" size={24} color="gray" />}
        onChangeText={
          function (currentinput) {
            setComment(currentinput);
          }
        }
      />
      <Button title="Comment" type="solid" onPress={
        async function () {
          firebase.firestore().collection("posts").doc(props.postcontent.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
              commentor: props.user.displayName,
              message: Comment,
              time: firebase.firestore.Timestamp.now(),
            })
          });
        }
      } />
    </Card>
  );
};

export default WriteCommentComponent;