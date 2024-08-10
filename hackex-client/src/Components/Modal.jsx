/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // Make sure to include the styles for the modal

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
        <p>{content.body}</p>
      </div>
    </>,
    document.body
  );
};

export default Modal;
