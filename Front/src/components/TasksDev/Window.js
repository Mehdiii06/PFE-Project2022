import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement("#root")

const Window = ({ show, onClose, task }) => {
  return (
    <Modal
        isOpen={show}
        onRequestClose={onClose}
        className={"modal"}
        overlayClassName={"overlay"}
    >
        <div className={"colse-btn-ctn"}>
            <h1 style={{ flex: "1 90%" }}>{task.object}</h1>
            <button className={"close-btn"} onClick={onClose}>X</button>
        </div>
        <div>
            <h2>Description</h2>
            <p>{task.content}</p>
            <h2>Status</h2>
            <p>
                {`${task.status.charAt(0).toUpperCase()}${task.status.slice(1)}`}
            </p>
        </div>
    </Modal>
  )
}

export default Window