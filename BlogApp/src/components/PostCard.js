import React, { useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const PostCard = (props) => {
    return (
        <Card>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Avatar
                    containerStyle={{ backgroundColor: "#ffab91" }}
                    rounded
                    icon={{ name: "user", type: "font-awesome", color: "black" }}
                    activeOpacity={1}
                />
                <Text h4Style={{ padding: 10 }} h4>
                    {props.author}
                </Text>
            </View>
            <Text style={{ fontStyle: "italic" }}>Posted on: {props.date}</Text>
            <Text
                style={{
                    paddingVertical: 10,
                }}
            >
                {props.body}
            </Text>
            <Card.Divider />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button
                    type="outline"
                    title={props.like.length + ''}
                    icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
                />
                <Button type="solid" title={"Comment " + props.comments.length} />
            </View>
        </Card>
    );
};

export default PostCard;