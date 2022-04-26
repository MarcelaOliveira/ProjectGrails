import React, { useState } from "react";
import ModalEditar from "./Modals/ModalEditar";
import ModalDeletar from "./Modals/ModalDeletar";
import { StyledViw } from "./StyledViw";
import { Table, Row, Col, Button, Card } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function Welcome({user, deslogar}) {
  const [buttonState, setButtonState] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModalDelete = () => {
    setIsModalVisible(true);
  };

  const handleDeletar = (deletar) => {
    // deletar.preventDefault();
    // const usuario = JSON.parse(localStorage.getItem("logged"));
  };

  const handleEditar = (editar) => {
    // const users = getLocalStorage();
    // const usuario = JSON.parse(localStorage.getItem("logged"));
    // const newData = users.map((user) => {
    //   if (user.email === usuario) {
    //     return { ...editar };
    //   } else {
    //     return users;
    //   }
    // });
    // setLocalStorage(newData);
    // localStorage.setItem("logged", JSON.stringify(editar.email));
    // window.location.reload();
  };

  const handleSizeChange = (e) => {
    setButtonState( e.target.value );
  };

  const size = buttonState;

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
    },
    {
      title: "Telefone",
      key: "telefone",
      dataIndex: "telefone",
    },
    {
      title: "Editar",
      key: "editar",
      dataIndex: "editar",
      render: (text) => (
        <a onClick={showModal}>
          <FormOutlined />
        </a>
      ),
    },
    {
      title: "Deletar",
      key: "deletar",
      dataIndex: "deletar",
      render: (text) => (
        <a style={{ color: "red" }} onClick={showModalDelete}>
          <DeleteOutlined />
        </a>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      nome: user.username,
      email: user.email,
      endereco: user.endereco,
      telefone: user.telefone,
    },
  ];

  return (
    <StyledViw>
      <center>
        <Card
          className="card"
          type="inner"
          ustify="space-around"
          align="middle"
          style={{ marginTop: 80, width: 1200 }}
        >
          <div justify="space-around" align="middle">
            {/*<h1>Welcome, {user.nome}</h1>*/}
          </div>
          <Row justify="space-around" align="middle">
            <Col span={18}>
              <Table columns={columns} dataSource={data} pagination={false} />
              {/*<ModalEditar*/}
              {/*  // user={user}*/}
              {/*  onSubmit={handleEditar}*/}
              {/*/>*/}
              {/*<ModalDeletar*/}
              {/*  onSubmit={handleDeletar}*/}
              {/*/>*/}
            </Col>
          </Row>

          <center>
            <Card
              type="inner"
              style={{ marginTop: 20, width: 200 }}
              justify="space-around"
              align="middle"
            >
              Deseja sair?
              <Button type="link" size={size} onClick={deslogar}>
                Sair
              </Button>
            </Card>
          </center>
        </Card>
      </center>
    </StyledViw>
  );
}

export default Welcome;
