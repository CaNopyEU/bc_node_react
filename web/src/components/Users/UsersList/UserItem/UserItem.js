import React from "react";

import './UserItem.css';

const userItem = props => (
    <tr key={props.userId} className="user__list-item">
        <td>{props.username}</td>
        <td>{props.email}</td>
        <td>{props.first}</td>
        <td>{props.last}</td>
        <td>{props.privilege}</td>
        <td>
            <button className="btn">View Details</button>
        </td>
    </tr>
);

export default userItem;