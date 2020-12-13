import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#20C6DC" }}>
            <ActivityIndicator size="large" color="white" animating={true} />
        </View>
    );
};

export default Loading;