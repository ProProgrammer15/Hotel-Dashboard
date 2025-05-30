import React from "react";
import { Modal, Button } from "antd";

interface DeleteRoomModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Are you sure?"
      visible={visible}
      onCancel={onCancel}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-start", gap: 8 }}>
          <Button
            type="primary"
            danger
            style={{ backgroundColor: "#ff5757", borderColor: "#ff4d4f" }}
            onClick={onOk}
          >
            YES DELETE
          </Button>
          <Button
            style={{
              backgroundColor: "#3b3b3b",
              color: "#fff",
              borderColor: "#333",
            }}
            onClick={onCancel}
          >
            NO TAKE ME BACK
          </Button>
        </div>
      }
    >
      <p>You are deleting a room...</p>
    </Modal>
  );
};

export default DeleteRoomModal;
