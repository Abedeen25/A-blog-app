import React, { useReducer, useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { storeDataJson, mergeData } from '../functions/AsyncstorageFunction';
import { Entypo } from "@expo/vector-icons";


const WriteCommentComponent = (props) => {
  const [Commentno, setCommentno] = useState(props.postcontent.commentcount);
  const [Comment, setComment] = useState("");
  const input = React.createRef();
  let today = new Date().toLocaleDateString();
  let currenttime = new Date().toLocaleTimeString();

  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar
          containerStyle={{ backgroundColor: "#9AF1ED" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "#0166DA" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.postcontent.uname}
        </Text>
      </View>
      <Text h6Style={{ padding: 10 }} h6 style={{ alignSelf: "stretch", color: 'gray' }}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}>Posted at: </Text>{props.postcontent.time}, {props.postcontent.date}
      </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.postcontent.post}
      </Text>
      <Text h6Style={{ padding: 10 }} h6 style={{ color: 'gray' }}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}>Likes: </Text>{props.postcontent.likecount}
        <Text style={{ fontWeight: "bold", fontStyle: "italic", color: 'gray' }}> , Comments: </Text>{props.postcontent.commentcount}
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
          if (Comment.size != 0) {
            const id = Math.ceil(Math.random() * 1000000000000000);
            let newcomment = {
              pid: props.postcontent.pid,
              cid: "cid#" + id + props.postcontent.pid,
              comment: Comment,
              uname: props.user.name,
              date: today,
              time: currenttime,
            }
            storeDataJson("cid#" + id + props.postcontent.pid, newcomment);
            console.log(newcomment);
          } else {
            alert("Must enter any character");
          }
          setComment("");
          input.current.clear();

          let ccount = (Commentno + 1)
          await mergeData(props.postcontent.pid, JSON.stringify({ commentcount: ccount }))
          const id = Math.ceil(Math.random() * 1000000000000000);
          let newnotification = {
            pid: props.postcontent.pid,
            nid: "nid#" + id + props.postcontent.pid,
            author: props.postcontent.uname,
            uname: props.user.name,
            date: today,
            time: currenttime,
            type: "comment",
          }
          storeDataJson("nid#" + id + props.postcontent.pid, newnotification);
          console.log(newnotification);
          setCommentno(Commentno + 1);


        }
      } />
    </Card>
  );
};

export default WriteCommentComponent;