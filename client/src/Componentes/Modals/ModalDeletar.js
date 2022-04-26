import React, {useState} from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";

export default function ModalDeletar(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible( false)
    }
  return (
    <div>
      <Modal title="Deletar conta" visible={showModal}  onCancel={ handleCancel} onOk={props.onSubmit}>
          <p>Deseja realmente deletar sua conta?</p>
        </Modal>
    </div>
  );
}
