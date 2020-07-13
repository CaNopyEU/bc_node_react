import React, {useState} from "react";

import './UserItem.css';

function userItem(props) {

  return (
    <tr key={props.id} className="user__list-item">
      <td>{props.id}</td>
      <td>{props.username}</td>
      <td>{props.role}</td>
      <td className="in-row">
        <button onClick={props.onEdit.bind(this, props.user)} className="btn">Upraviť</button>
        {props.role !== 'admin' &&
        <button onClick={props.onDetail.bind(this, props.id)} className="btn">Zobraziť Detail</button>
        }
        <button onClick={props.delete.bind(this, props.user)}
                className={`btn ${props.user.active === true ? 'red' : 'green'}`}>{props.user.active === true ? 'Deaktivovať' : 'Aktivovať'} </button>
      </td>
    </tr>
  )
}

export default userItem;