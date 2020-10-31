import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { AuthContext } from '../provider/AuthProvider';
import { getDataJSON } from '../functions/AsyncStorageFunctions';

const SignInScreen = (props) => {
    const [Mail, setMail] = useState("");
    const [Pass, setPass] = useState("");

    return (
        <AuthContext.Consumer>
            {(auth) => (<View style={style.viewStyle}>
                <Card>
                    <Card.Title>Start Blogging!</Card.Title>
                    <Card.Divider />

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
                        icon={<MaterialCommunityIcons name="login" size={24} color="white" />}
                        title='  Sign In'
                        type='solid'
                        color='#AE91FF'
                        onPress={async function () {
                            let userData = await getDataJSON(Mail);
                            if (Pass === userData.password) {
                                auth.setIsLoggedIn(true);
                                auth.setCurrentUser(userData);
                            }
                            else {
                                alert("Oops! Something went wrong :(");
                                console.log(userData);
                            }
                        }}
                    />


                    <Button
                        icon={<Octicons name="person" size={24} color="dodgerblue" />}
                        title=" Don't have an Account"
                        type='clear'
                        onPress={function () {
                            props.navigation.navigate('Sign Up');
                        }}
                    />
                </Card>
            </View>)}
        </AuthContext.Consumer>
    );
}

const style = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#38869B'
    }
});

export default SignInScreen;