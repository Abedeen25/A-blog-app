import React, { useState } from 'react';
import { ImageBackground, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { Feather, FontAwesome, Ionicons, MaterialIcons, Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { storeDataJson } from '../functions/AsyncstorageFunction';
import * as firebase from "firebase";
import "firebase/firestore";

const SignupScreen = (props) => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [DoB, setDoB] = useState("");
    const [Address, setAddress] = useState("");
    const [WorkPlace, setWorkPlace] = useState("");
    return (
        <SafeAreaView style={styles.viewStyle}>
            <ImageBackground source={require('./../../assets/BG1.jpg')} style={styles.imageStyle}>
                <Card>
                    <Card.Title style={styles.textStyle}>Get Started!</Card.Title>
                    <Card.Divider />

                    <Input
                        rightIcon={<Ionicons name="md-person" size={24} color="gray" />}
                        placeholder='Name'
                        onChangeText={
                            function (currentinput) {
                                setName(currentinput);
                            }
                        }
                    />

                    <Input
                        rightIcon={<MaterialIcons name="date-range" size={24} color="gray" />}
                        placeholder='Birth Day (DD.MM.YYYY)'
                        onChangeText={function (currentInput) {
                            setDoB(currentInput);
                        }}
                    />

                    <Input
                        rightIcon={<Entypo name="location" size={24} color="gray" />}
                        placeholder='Address'
                        onChangeText={function (currentInput) {
                            setAddress(currentInput);
                        }}
                    />

                    <Input
                        rightIcon={<Octicons name="organization" size={24} color="gray" />}
                        placeholder='Workplace'
                        onChangeText={function (currentInput) {
                            setWorkPlace(currentInput);
                        }}
                    />

                    <Input
                        rightIcon={<Feather name="mail" size={24} color="gray" />}
                        placeholder='E-mail Address'
                        onChangeText={
                            function (currentinput) {
                                setEmail(currentinput);
                            }
                        }
                    />

                    <Input
                        rightIcon={<Feather name="key" size={24} color="gray" />}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={
                            function (currentinput) {
                                setPassword(currentinput);
                            }
                        }
                    ></Input>

                    <Button
                        icon={<Ionicons name="md-person-add" size={24} color="white" />}
                        title="  Sign Up"
                        type="solid"
                        onPress={() => {
                            if (Name && DoB && Email && Password && Address && WorkPlace) {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(Email, Password)
                                    .then((userCreds) => {
                                        userCreds.user.updateProfile({ displayName: Name });
                                        firebase
                                            .firestore()
                                            .collection("users")
                                            .doc(userCreds.user.uid)
                                            .set({
                                                name: Name,
                                                email: Email,
                                                dateOfBirth: DoB,
                                                address: Address,
                                                workPlace: WorkPlace,
                                            })
                                            .then(() => {
                                                alert("Account created successfully!");
                                                props.navigation.navigate("SignIn");
                                            })
                                            .catch((error) => {
                                                alert(error);
                                            });
                                    })
                                    .catch((error) => {
                                        alert(error);
                                    });
                            } else {
                                alert("Fields can not be empty!");
                            }
                        }
                            // function () {
                            //     let currentuser = {
                            // name: Name,
                            // email: Email,
                            // password: Password,
                            // dateOfBirth: DoB,
                            // address: Address,
                            // workPlace: WorkPlace,
                            //     };
                            //     storeDataJson(Email, currentuser);
                            //     props.navigation.navigate('SignIn');
                            // }
                        }
                    />

                    <Button
                        icon={<MaterialCommunityIcons name="login" size={24} color="dodgerblue" />}
                        title=" Already have an Account"
                        type="clear"
                        onPress={
                            function () {
                                props.navigation.navigate('SignIn')
                            }
                        }
                    />

                </Card>
            </ImageBackground>
        </SafeAreaView>
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

export default SignupScreen;