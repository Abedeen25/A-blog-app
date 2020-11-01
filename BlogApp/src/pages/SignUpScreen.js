import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { Feather, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo, Octicons } from '@expo/vector-icons';

import { storeDataJSON } from '../functions/AsyncStorageFunctions';

const SignUpScreen = (props) => {
    const [Name, setName] = useState("");
    const [DoB, setDoB] = useState("");
    const [Address, setAddress] = useState("");
    const [WorkPlace, setWorkPlace] = useState("");
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
                    rightIcon={<MaterialIcons name="date-range" size={24} color="black" />}
                    placeholder='Birth Day (DD.MM.YYYY)'
                    onChangeText={function (currentInput) {
                        setDoB(currentInput);
                    }}
                />

                <Input
                    rightIcon={<Entypo name="location" size={24} color="black" />}
                    placeholder='Address'
                    onChangeText={function (currentInput) {
                        setAddress(currentInput);
                    }}
                />

                <Input
                    rightIcon={<Octicons name="organization" size={24} color="black" />}
                    placeholder='Workplace'
                    onChangeText={function (currentInput) {
                        setWorkPlace(currentInput);
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
                            dateOfBirth: DoB,
                            address: Address,
                            workPlace: WorkPlace,
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
        backgroundColor: '#007AFF'
    }
});

export default SignUpScreen;