import React, {useState} from "react";

import './UserItem.css';

const userItem = props => (

  <tr key={props.id} className="user__list-item">
    <td>{props.id}</td>
    <td>{props.username}</td>
    <td>{props.role}</td>
    <td>
      <button onClick={props.onDetail.bind(this, props.id)} className="btn">Zobraziť Detail</button>
    </td>
  </tr>
);

export default userItem;