import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList, Alert } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import PostCard from "../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../provider/AuthProvider";
import { PostCreator } from "../functions/PostHandler";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsyncStorageFunctions";

const Home = (props) => {
    let [Posts, setPosts] = useState([]);
    const [PostBody, setPostBody] = useState("");


    const getData = async () => {
        await getDataJSON("posts").then((data) => {
            if (data == null) {
                setPosts([]);
            } else setPosts(data);
        });
    };


    useEffect(() => {
        getData();
    }, []);



    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <HeaderHome
                        user={auth.CurrentUser.name}
                        DrawerFunction={() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                    <Card>
                        <Input
                            placeholder="What's On Your Mind?"
                            leftIcon={<Entypo name="pencil" size={24} color="black" />}
                            onChangeText={function (currentInput) {
                                setPostBody(currentInput);
                            }}
                        />
                        <Button title="Post" type="outline" onPress={async function () {
                            let post = await PostCreator(auth.CurrentUser.name, auth.CurrentUser.email, PostBody);
                            let tempPost = [...Posts, post];

                            await storeDataJSON("posts", tempPost).then(() => {
                                setPosts(tempPost);
                            });
                        }} />
                    </Card>

                    <FlatList
                        data={Posts}
                        renderItem={(postItem) => (
                            <PostCard
                                author={postItem.item.author}
                                date={postItem.item.date}
                                body={postItem.item.postBody}
                                like={postItem.item.likes}
                                comments={postItem.item.comments}
                            />
                        )}
                    />
                </View>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
    },
    viewStyle: {
        flex: 1,
    },
});

export default Home;