import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { storeDataJSON } from '../functions/AsyncStorageFunctions';

const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Mail, setMail] = useState("");
    const [Pass, setPass] = useState("");

    return (
        <View style={style.viewStyle}>
            <Card>
                <Card.Title>Get Started!</Card.Title>
                <Card.Divider />

                <Input
                    rightIcon={<Ionicons name="md-person" size={24} color="black" />}
                    placeholder='Full Name'
                    onChangeText={function (currentInput) {
                        setName(currentInput);
                    }}
                />

                <Input
                    rightIcon={<MaterialCommunityIcons name="music-accidental-sharp" size={24} color="black" />}
                    placeholder='Student ID'
                    onChangeText={function (currentInput) {
                        setSID(currentInput);
                    }}
                />

                <Input
                    rightIcon={<Feather name="mail" size={24} color="black" />}
                    placeholder='E-mail Address'
                    onChangeText={function (currentInput) {
                        setMail(currentInput);
                    }}
                />

                <Input
                    rightIcon={<Feather name="key" size={24} color="black" />}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={function (currentInput) {
                        setPass(currentInput);
                    }}
                />

                <Button
                    icon={<Ionicons name="md-person-add" size={24} color="white" />}
                    title='  Sign Up'
                    type='solid'
                    onPress={function () {
                        let currentUser = {
                            name: Name,
                            sid: SID,
                            email: Mail,
                            password: Pass,
                        };
                        storeDataJSON(Mail, currentUser);
                        props.navigation.navigate("Sign In")
                    }}
                />


                <Button
                    icon={<MaterialCommunityIcons name="login" size={24} color="dodgerblue" />}
                    title=" Already have an Account"
                    type='clear'
                    onPress={function () {
                        props.navigation.navigate('Sign In');
                    }}
                />
            </Card>
        </View>
    );
}

const style = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#38869B'
    }
});

export default SignUpScreen;