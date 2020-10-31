import React, {useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';

const Home = (props)=>{
    return(
        <View>
            <Text style={style.testStyle}>Welcome Home :D</Text>
        </View>
    );
}

const style = StyleSheet.create({
    testStyle: {
        fontSize: 25,
        color: '#555',
    },
});

export default Home;