import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

const SignUpScreen = (props)=>{
    return(
        <View>
            <Text>Sign Up</Text>

            <Button
                title='Sign In!'
                onPress={function(){
                    props.navigation.navigate('Sign In');
                }}
            />
        </View>
    );
}

const style = StyleSheet.create({
    testStyle: {
        fontSize: 25,
        color: '#333',
    },
});

export default SignUpScreen;