import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../provider/AuthProvider';
import { Button } from 'react-native-elements';

const Home = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View>
                    <Text>Welcome Home :D</Text>
                    <Button
                        type='outline'
                        title='Log Out!'
                        onPress={function () {
                            auth.setIsLoggedIn(false);
                            auth.setCurrentUser({});
                        }}
                    />
                </View>)}
        </AuthContext.Consumer>
    );
}

const style = StyleSheet.create({
    testStyle: {
        fontSize: 25,
        color: '#555',
    },
});

export default Home;