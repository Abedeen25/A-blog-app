import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

const SignInScreen = (props)=>{
    return(
        <View style={style.viewStyle}>
            <Card>
                <Card.Title>Start Blogging!</Card.Title>
                <Card.Divider/>
                
                <Input
                    leftIcon={<Feather name="mail" size={24} color="black" />}
                    placeholder='E-mail Address'
                />
                
                <Input
                    leftIcon={<Feather name="key" size={24} color="black" />}
                    placeholder='Password'
                />

                <Button
                    icon={<MaterialCommunityIcons name="login" size={24} color="white" />}
                    title='  Sign In'
                    type='solid'
                    color='#AE91FF'
                />
                
                
                <Button
                    icon={<Octicons name="person" size={24} color="dodgerblue" />}
                    title=" Don't have an Account"
                    type='clear'
                    onPress={function(){
                        props.navigation.navigate('Sign Up');
                    }}
                />
            </Card>
        </View>
    );
}

const style = StyleSheet.create({
    viewStyle:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#38869B'
    }
});

export default SignInScreen;