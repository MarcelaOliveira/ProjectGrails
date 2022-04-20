import api from "./APIAxios"
import { notification } from "antd";
import {SERVER_URL} from "../config"

const setUser = (user) =>{
    if(!user){
        notification.error({
            message: `Login invalido`,
            description: "Verifique seu email, ou faça cadastro",
        });
    }else{
        api.get(`api/user/getUsername?username=${user.user.username} `).then(()=>{
            api.get("api/login", user).then(response =>{
                if(response.success){
                    console.log(response)
                }
            })

        })
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