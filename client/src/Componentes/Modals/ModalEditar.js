import React, { useState, useEffect } from "react";
import { StyledForms } from "../Forms/StyledForms";
import { Modal, Form, Input, Button } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  UnlockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "antd/dist/antd.css";

export default function ModalEditar(props) {
  const [form] = Form.useForm();
  const [userEdit, setUserEdit] = useState({});
  const [erro, setErro] = useState({});
  const [buttonState, setButtonState] = useState();
  const { user } = props;

  const setInputs = (evento) => {
    const stat = { ...user };
    stat[evento.target.name] = evento.target.value;
    setUserEdit(stat);
  };

  const onSave = (evente) => {
    if (evente.senha === evente.confSenha) {
      props.onSubmit(userEdit);
    } else {
      setErro("Senha e confirmar senha devem ser iguais!");
    }
  };
  const handleSizeChange = (e) => {
    setButtonState({ size: e.target.value });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const size = buttonState;

  useEffect(() => {
    form.setFieldsValue({
      ...user,
    });
  }, [props]);

  return (
      <div>
        <Form autoComplete="off" onFinishFailed={onFinishFailed} form={form}>
          <Modal
              title="Editar conta"
              visible={props.isModalVisible}
              onCancel={props.handleCancel}
              footer={[
                <Button key="submit" type="primary" onClick={onSave}>
                  Editar
                </Button>,
                <Button key="back" onClick={props.handleCancel}>
                  Cancelar
                </Button>,
              ]}
          >
            <StyledForms>
              <center>
                <Form.Item
                    name="username"
                    onChange={setInputs}
                    rules={[
                      {
                        required: true,
                        message: "Por favor preencha todos os campos!",
                      },
                    ]}
                >
                  <Input
                      prefix={<UserOutlined />}
                      name="username"
                      className="input"
                      type="text"
                  />
                </Form.Item>
                <Form.Item
                    name="email"
                    onChange={setInputs}
                    rules={[
                      {
                        required: true,
                        message: "Por favor preencha todos os campos!",
                      },
                    ]}
                >
                  <Input
                      prefix={<MailOutlined />}
                      name="email"
                      className="input"
                      type="email"
                  />
                </Form.Item>
                <Form.Item
                    name="endereco"
                    onChange={setInputs}
                    rules={[
                      {
                        required: true,
                        message: "Por favor preencha todos os campos!",
                      },
                    ]}
                >
                  <Input
                      prefix={<HomeOutlined />}
                      name="endereco"
                      className="input"
                  />
                </Form.Item>
                <Form.Item
                    name="telefone"
                    onChange={setInputs}
                    rules={[
                      {
                        required: true,
                        message: "Por favor preencha todos os campos!",
                      },
                    ]}
                >
                  <Input
                      prefix={<PhoneOutlined />}
                      name="telefone"
                      type="text"
                      className="input"
                  />
                </Form.Item>
              </center>
            </StyledForms>
          </Modal>
        </Form>
      </div>
  );
}