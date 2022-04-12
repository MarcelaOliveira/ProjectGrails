import api from "./APIAxios"
import { notification } from "antd";
import {SERVER_URL} from "../config"

const setUser = (user) =>{
    if(typeof user === undefined){
        notification.error({
            message: `Cadastro já existente`,
            description: "Verifique seu email, ou faça login",
        });
    }else{
        localStorage.setItem("logged", JSON.stringify(user));
    }
}
const getUserById = () =>{
    const userLocalStorage = localStorage.getItem("logged");
    const user = userLocalStorage ? JSON.parse(userLocalStorage) : [];
    return user;
}
const logIn = ({ user }) =>{
    return new Promise((resolve, reject) =>{
        try{
            setUser({user});
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