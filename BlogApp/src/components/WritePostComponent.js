import React, { useReducer, useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { storeDataJson } from '../functions/AsyncstorageFunction';
import { Entypo } from "@expo/vector-icons";


const WritePostComponent = (props) => {
    const [Post, setPost] = useState("");
    const input = React.createRef();
    let today = new Date().toLocaleDateString();
    let currenttime = new Date().toLocaleTimeString();
    return (
        <Card>
            <Input
                ref={input}
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="gray" />}
                onChangeText={
                    function (currentinput) {
                        setPost(currentinput);
                    }
                }
            />
            <Button title="Post" type="outline" onPress={
                function () {
                    if (Post.size != 0) {
                        const id = Math.ceil(Math.random() * 1000000000000000);
                        let newpost = {
                            pid: "pid#" + id + props.user.name,
                            post: Post,
                            uname: props.user.name,
                            date: today,
                            time: currenttime,
                            likecount: 0,
                            commentcount: 0,
                        };
                        storeDataJson("pid#" + id + props.user.name, newpost);
                    } else {
                        alert("Must enter any character");
                    }
                    setPost("");
                    input.current.clear();
                }
            } />
        </Card>
    );
};

export default WritePostComponent;