import React, { useEffect, useState } from "react";
import FormLogin from "./Componentes/Forms/FormLogin";
import FormRegister from "./Componentes/Forms/FormRegister";
import Welcome from "./Componentes/Welcome";
import ViewAdm from "./Componentes/ViewAdm";
import PageNotFound from "./Componentes/PageNotFound";
import api from "./Services/APIAxios";
import { Authentication }  from "./Services/Authentication"
import header from "./Services/Header";
import { notification } from "antd";
import "./css/App.css"

const App = () => {
    const [screen, setScreen] = useState("Register");
    const [data, setData] =  useState({});

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("dbUser"));
        if(user){
            const { roles, access_token } = user;
            const headers = {
                ...header,
                Authorization: `Bearer ${access_token}`
            }
            if (user != null || Object.values(user).length > 0) {
                if(roles.includes("ROLE_ADMIN")){
                    api.get("/api/user", {headers}).then(values=>{
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
                    api.get(`/api/user/getUsername?username=${user.username}`,{headers}).then(values=>{
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
                const headers = {
                    ...header,
                    Authorization: `Bearer ${response.data.access_token}`
                }
                Authentication.logIn(response.data).then(()=>{
                    if(response.data.roles.includes('ROLE_ADMIN')){
                        api.get('/api/user',{headers}).then(values=>{
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
                        api.get(`/api/user/getUsername?username=${response.data.username}`,{headers} ).then(values=>{
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
                        })
                    }
                }).catch(()=>{
                    notification.error({
                        message: `Login invalido`,
                        description: "Verifique seu email, ou faça cadastro",
                    });
                    setScreen("Login");
                })
            }
        })
    };

    const handleEditar = (userEdit) => {
        console.log(userEdit)
        const auth = JSON.parse(localStorage.getItem("dbUser")).access_token;
        if(userEdit){
            const headers = {
                ...header,
                Authorization: `Bearer ${auth}`
            }
            api.put(`/api/user/update/${userEdit.id}`,userEdit, {headers}).then(response =>{
                if(response.data){
                    Authentication.setUsername(response.data.username).then(values => {
                      setData(response.data)
                    }).catch(() => {
                        notification.error({
                                message: `Update invalido`,
                                description: "Verifique seus dados!",
                        });
                        setScreen("Welcome");
                    })

                }else{
                    notification.error({
                        message: `Update invalido`,
                        description: "Verifique seus dados!",
                    });
                    setScreen("Welcome");
                }
            })
        }else{
            notification.error({
                message: `Update invalido`,
                description: "Verifique seus dados!",
            });
            setScreen("Welcome");
        }
        window.location.reload();
     }

    const handleDeletar = (userDelit) => {
        userDelit.preventDefault();
        const user =JSON.parse(localStorage.getItem("dbUser"));
        const headers = {
            ...header,
            Authorization: `Bearer ${user.access_token}`
        }
        api.get(`/api/user/getUsername?username=${user.username}`, {headers}).then(values=> {
            if (values.data == "undefined" || !values.data) {
                notification.error({
                    message: `Não foi possivel remover seus dados`,
                    description: "Verifique seus dados",
                });
            } else {
                api.delete(`/api/user/delete?id=${values.data.id}`, {headers}).then(()=>{
                    localStorage.removeItem("dbUser");
                    window.location.reload();
                }).catch(()=>{
                    console.log("Deu ruim");
                })
            }
        })
    }

    const deslogar = (e) => {
        e.preventDefault();
        setScreen("Login");
        localStorage.removeItem("dbUser");
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
                    <Welcome user={data}  onSubmit={handleEditar}
                             onDeletar={handleDeletar} deslogar={deslogar}/>
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