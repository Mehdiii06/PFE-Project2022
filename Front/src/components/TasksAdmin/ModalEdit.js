import React from "react";
import Modal from "react-modal";
import './ModalEdit.scss'

Modal.setAppElement("#root");

const ModalEdit = ({ show, onClose, t }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div>{t.content}</div>
      <div>{t.content}</div>
      <div>{t.content}</div>
      <div>{t.content}</div>
      <div>{t.content}</div>
      <div>{t.content}</div>
      <div>{t.content}</div>
    </Modal>
  );
};

export default ModalEdit;
