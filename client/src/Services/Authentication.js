import { notification } from "antd";
import React from "react";

const setUser = (user) =>{
    if(!user){
        notification.error({
            message: `Login invalido`,
            description: "Verifique seu email, ou faça cadastro",
        });
    }else{
        localStorage.setItem("dbUser", JSON.stringify({username: user.username, roles: user.roles, access_token: user.access_token}) );
    }
}
const getUserById = () =>{
    const userLocalStorage = localStorage.getItem("logged");
    const user = userLocalStorage ? JSON.parse(userLocalStorage) : [];
    return user;
}
const logIn = (user) =>{
    return new Promise((resolve, reject) =>{
        try{
            setUser(user);
            resolve(true);
        }catch(err){
            reject(err);
        }
    })
}
const logOut = () => {
    delete localStorage.user;
}

export const Authentication = {
    setUser,
    getUserById,
    logIn,
    logOut
}