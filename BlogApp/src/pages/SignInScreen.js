import React, { useState } from 'react';
import { ImageBackground, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { Fontisto, Feather, FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../provider/AuthProvider';
import { getDataJson } from '../functions/AsyncstorageFunction';
import { AsyncStorage } from 'react-native';
import * as firebase from "firebase";


const SigninScreen = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <SafeAreaView style={styles.viewStyle}>
                    <ImageBackground source={require('./../../assets/BG1.jpg')} style={styles.imageStyle}>
                        <Card>
                            <Card.Title style={styles.textStyle}>Start Blogging!</Card.Title>
                            <Card.Divider />
                            <Input
                                leftIcon={<Feather name="mail" size={24} color="gray" />}
                                placeholder='Email'
                                onChangeText={
                                    function (currentinput) {
                                        setEmail(currentinput);
                                    }
                                }></Input>
                            <Input
                                leftIcon={<Feather name="key" size={24} color="gray" />}
                                placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={
                                    function (currentinput) {
                                        setPassword(currentinput);
                                    }
                                }></Input>
                            <Button
                                icon={<FontAwesome name="sign-in" size={24} color="white" />}
                                title="  Sign In"
                                type="solid"
                                onPress={() => {
                                    firebase
                                        .auth()
                                        .signInWithEmailAndPassword(Email, Password)
                                        .then((userCreds) => {
                                            auth.setIsloggedIn(true);
                                            auth.setCurrentUser(userCreds.user);
                                            console.log(userCreds.user)
                                        })
                                        .catch((error) => {
                                            alert(error);
                                        });
                                }}
                            />
                            <Button
                                title=" Don't have an Account"
                                type="clear"
                                onPress={
                                    function () {
                                        props.navigation.navigate('SignUp')
                                    }
                                }
                            />
                            {/* <Button
                                title="erase"
                                type="clear"
                                onPress={
                                    async function () {
                                        try {
                                            await AsyncStorage.clear()
                                        } catch (error) {
                                            console.log(error)
                                        }

                                    }
                                }
                            /> */}
                        </Card>
                    </ImageBackground>
                </SafeAreaView>
            )}
        </AuthContext.Consumer>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: "#14C1D7",
    },
    textStyle1: {
        fontSize: 30,
        color: "steelblue",
        fontStyle: "italic",
    },
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    imageStyle: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
})

export default SigninScreen;