import React, { useEffect, useState } from "react";
import FormLogin from "./Componentes/Forms/FormLogin";
import FormRegister from "./Componentes/Forms/FormRegister";
import Welcome from "./Componentes/Welcome";
import ViewAdm from "./Componentes/ViewAdm";
import PageNotFound from "./Componentes/PageNotFound";
import api from "./Services/APIAxios";
import { Authentication }  from "./Services/Authentication"
import headers from "./Services/Headers";


import { notification } from "antd";
import "./css/App.css"

const App = () => {
    const [screen, setScreen] = useState("Register");
    const [data, setData] =  useState({});

    const getLocalStorage = (usuario) => {
        const dbUserStorage = localStorage.getItem("dbUser");
        const dbUser = dbUserStorage ? JSON.parse(dbUserStorage) : [];
        if (usuario) {
            return dbUser.find((user) => user.email === usuario.email);
        } else {
            return dbUser;
        }
    };

    const setLocalStorage = (dbUser) => {
        if (typeof dbUser === "undefined") {
            localStorage.setItem("dbUser", JSON.stringify([]));
        } else {
            localStorage.setItem("dbUser", JSON.stringify(dbUser));
        }
    };

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("dbUser"));
        const header = {headers}
        if(user){
            const { roles } = user
            if (user != null || Object.values(user).length > 0) {
                if(roles.includes("ROLE_ADMIN")){
                    api.get('/api/user', {headers: header.headers}).then(values=>{
                            if (values.data == "undefined" || !values.data) {
                                notification.error({
                                    message: `Login invalido`,
                                    description: "Verifique seu email, ou faça cadastro",
                                });
                            } else {
                                setData(values.data);
                                setScreen("ViewAdm");
                            }
                        }
                    ).catch( ()=>{
                        notification.error({
                            message: `Login invalido`,
                            description: "Verifique seu email, ou faça cadastro",
                        });
                        setScreen("Login");
                    });
                } else {
                    api.get(`api/user/getUsername?username=${user.username}`,  header).then(values=>{
                        if (values.data == "undefined" || !values.data) {
                            notification.error({
                                message: `Login invalido`,
                                description: "Verifique seu email, ou faça cadastro",
                            });
                        } else {
                            setData(values.data);
                            setScreen("Welcome");
                        }
                    }).catch( ()=>{
                            notification.error({
                                message: `Login invalido`,
                                description: "Faça login!",
                            });
                            setScreen("Login");
                        }
                    )
                }
        }else{
                setScreen("Login");
            }
        } else {
            setScreen("Login");
        }
    }, []);


    const deslogar = (e) => {
        e.preventDefault();
        setScreen("Login");
        localStorage.removeItem("dbUser");
    };

    const handleRegister = (event) => {
       api.post("/api/user/save", event ).then(e =>  setScreen("Login") )
    .catch( e =>{
          setScreen("Register")
             notification.error({
                message: `Cadastro já existente`,
                description: "Verifique seu email, ou faça login",
             })
          }
       )
    };

    const handleLogin = (user) => {
        api.post("/api/login", user).then(response =>{
            if(response.data){
                Authentication.logIn(response.data).then(()=>{
                    const header = {headers}
                    if(response.data.roles.includes('ROLE_ADMIN')){
                        api.get('/api/user', {headers: header.headers}).then(values=>{
                            if (values.data == "undefined" || !values.data) {
                                notification.error({
                                    message: `Login invalido`,
                                    description: "Verifique seu email, ou faça cadastro",
                                });
                            } else {
                                setData(values.data);
                                setScreen("ViewAdm");
                            }
                            }
                        ).catch( ()=>{
                            notification.error({
                                message: `Login invalido`,
                                description: "Verifique seu email, ou faça cadastro",
                            });
                            setScreen("Login");
                        });
                    }else{

                        api.get(`api/user/getUsername?username=${response.data.username}`, header).then(values=>{
                            if (values.data == "undefined" || !values.data) {
                                notification.error({
                                    message: `Login invalido`,
                                    description: "Verifique seu email, ou faça cadastro",
                                });
                            } else {
                                setData(values.data);
                                setScreen("Welcome");
                            }
                        }).catch( ()=>{
                                notification.error({
                                    message: `Login invalido`,
                                    description: "Verifique seu email, ou faça cadastro",
                                });
                                setScreen("Login");
                            }
                        )
                    }
                })
                .catch(()=>{
                    notification.error({
                        message: `Login invalido`,
                        description: "Verifique seu email, ou faça cadastro",
                    });
                    setScreen("Login");
                }
               )
            }
        })
    };


    const onClick = (e) => {
        e.preventDefault();
        if (screen === "Login") {
            setScreen("Register");
        } else {
            setScreen("Login");
        }
    };

    switch (screen) {
        case "Login":
            return (
                <div>
                    <FormLogin onSubmit={handleLogin} onClick={onClick} />
                </div>
            );
           break;
        case "ViewAdm":
            return (
                <div>
                    <ViewAdm users={data} deslogar={deslogar} />
                </div>
            );
        case "Welcome":
            return (
                <div>
                    <Welcome user={data} deslogar={deslogar}/>
                </div>
            );
            break;
        case "Register":
            return (
                <div className="register">
                    <FormRegister onFinish={handleRegister} onClick={onClick} />
                </div>
            );
        default:
            return (
                <div>
                    <PageNotFound back={deslogar}/>
                </div>
            );
    }
};

export default App;
