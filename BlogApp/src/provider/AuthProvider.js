import React, {useState} from 'react';

const AuthContext=React.createContext();

const AuthProvider=(props)=>{
    const [CurrentUser, setCurrentUser]=useState({});
    const [IsloggedIn, setIsloggedIn]=useState(false);

    return(
        <AuthContext.Provider value={{
            CurrentUser,
            setCurrentUser,
            IsloggedIn,
            setIsloggedIn
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};