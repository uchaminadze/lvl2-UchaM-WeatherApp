import React from "react";
import "./modal.css";

const Modal = (props) => {
  if (!props.open) return null;

  return (
    <div>
      <div className="modal-container" />

      <div className="modal">
        {props.title}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
