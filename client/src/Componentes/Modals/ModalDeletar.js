import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";

export default function ModalDeletar(props) {
  return (
    <div>
      <Modal title="Deletar conta" visible={props.isModalDeleteVisible}    onCancel={props.isModalVisible} onOk={props.onSubmit}>
          <p>Deseja realmente deletar sua conta?</p>
        </Modal>
    </div>
  );
}
