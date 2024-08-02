// Modal.js
import React from 'react';
import './modal.css'; // Ensure this path is correct

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Confirm Logout</h3>
        <p>Are you sure you want to log out?</p> 
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={onConfirm}>Yes</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
