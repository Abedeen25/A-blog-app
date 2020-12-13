import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import * as firebase from 'firebase';
import 'firebase/firestore';


const WritePostComponent = (props) => {
    const [IsLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState("");
    const input_ref = React.createRef();

    return (
        <Card>
            <Input
                ref={input_ref}
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                onChangeText={(currentText) => {
                    setInput(currentText);
                }}
            />
            {IsLoading ? <ActivityIndicator size="large" color="#20C6DC" animating={true} /> :
                <Button
                    title="Post"
                    type="outline"
                    onPress={
                        function () {
                            if (input) {
                                setIsLoading(true)
                                firebase.firestore().collection("posts").add({
                                    userId: props.user.uid,
                                    post: input,
                                    author: props.user.displayName,
                                    posted_at: firebase.firestore.Timestamp.now(),
                                    likes: [],
                                    comments: [],
                                }).then((obj) => {
                                    setIsLoading(false)
                                    alert("Post ID: " + obj.ZE.path.segments[1])
                                }).catch((error) => {
                                    setIsLoading(false)
                                    alert(error)
                                })
                                setInput('');
                                input_ref.current.clear();
                            } else {
                                alert("Please Write Something!");
                            }
                        }
                    }
                />
            }
        </Card>
    );
};

export default WritePostComponent;