import React from "react";
import { IoMdClose } from "react-icons/io";
import "../styles/confirmation-modal.css";


const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal flex-center">
      <div className="modal__content">
        <div className="modal-header">
          <h2>{title}</h2>
          <IoMdClose className="modal-close" onClick={onClose} />
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => handleConfirm()}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
