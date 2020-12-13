import React, { useReducer, useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { storeDataJson } from '../functions/AsyncstorageFunction';
import { Entypo } from "@expo/vector-icons";
import * as firebase from 'firebase';
import 'firebase/firestore';


const WritePostComponent = (props) => {
    const [Post, setPost] = useState("");
    const input = React.createRef();
    const [IsLoading, setIsLoading] = useState(false)

    return (
        <Card>
            <Input
                ref={input}
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="gray" />}
                onChangeText={
                    function (inputText) {
                        setPost(inputText);
                    }
                }
            />
            {IsLoading ? <ActivityIndicator size="large" color="#20C6DC" animating={true} /> : <Button title="Post" type="outline" onPress={
                function () {
                    if (Post) {
                        setIsLoading(true)
                        firebase.firestore().collection("posts").add({
                            userId: props.user.uid,
                            post: Post,
                            author: props.user.displayName,
                            posted_at: firebase.firestore.Timestamp.now(),
                            likes: [],
                            comments: []
                        }).then((obj) => {
                            setIsLoading(false)
                            alert("Post ID: " + obj.ZE.path.segments[1])
                        }).catch((error) => {
                            setIsLoading(false)
                            alert(error)
                        })
                    } else {
                        alert("Please Write Something!")
                    }
                    setPost("");
                    input.current.clear();

                    // if (Post.size != 0) {
                    //     const id = Math.ceil(Math.random() * 1000000000000000);
                    //     let newpost = {
                    //         pid: "pid#" + id + props.user.name,
                    //         post: Post,
                    //         uname: props.user.name,
                    //         date: today,
                    //         time: currenttime,
                    //         likecount: 0,
                    //         commentcount: 0,
                    //     };
                    //     storeDataJson("pid#" + id + props.user.name, newpost);
                    // } else {
                    //     alert("Must enter any character");
                    // }
                }} />}
        </Card>
    );
};

export default WritePostComponent;