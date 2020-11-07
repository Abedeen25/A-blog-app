import React from "react";
import { Header } from "react-native-elements";

import { AuthContext } from "../provider/AuthProvider";


const HeaderHome = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <Header
                    backgroundColor="#20C6DC"
                    leftComponent={{
                        icon: "menu",
                        color: "#fff",
                        onPress: props.DrawerFunction,
                    }}
                    centerComponent={{ text: props.user, style: { color: "#fff", fontSize: 18 } }}
                    rightComponent={{
                        icon: "lock-outline",
                        color: "#fff",
                        onPress: function () {
                            auth.setIsloggedIn(false);
                            auth.setCurrentUser({});
                        },
                    }}
                />
            )}
        </AuthContext.Consumer>
    );
};

export default HeaderHome;