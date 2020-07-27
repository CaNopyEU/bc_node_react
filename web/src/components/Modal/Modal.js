import React from "react";

import './Modal.css';

const modal = props => (
  <div className="modal">
    <header><h1 className="modal__header">{props.title}
      {props.canCancel &&
      <button onClick={props.onCancel}>
        X
      </button>}</h1></header>
    <section className="modal__content">
      {props.children}
    </section>
    <section className="modal__actions">
      {props.canCancel &&
      <button className="btn" onClick={props.onCancel}>
        Zrušiť
      </button>}
      {props.canConfirm &&
      <button className="btn" onClick={props.onConfirm}>
        {props.confirmText}
      </button>}
      {props.canEdit &&
      <button className="btn" onClick={props.onEdit}>
        {props.editText}
      </button>}
    </section>
  </div>
);

export default modal;