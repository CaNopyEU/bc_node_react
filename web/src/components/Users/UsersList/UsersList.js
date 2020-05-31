import React from "react";

import UserItem from './UserItem/UserItem';

import './UsersList.css';

const userList = props => {
    console.log(props)
    const users = props.users.map(user => {
        return (
            <UserItem
                key={user.id}
                id={user.id}
                username={user.username}
                role={user.role}
                onDetail={props.onViewDetail}
            />
        )
    })
    return (
        <table className="users__list">
            <tr className="users__list-item">
                <th>ID používateľa:</th>
                <th>Prihlasovacie meno:</th>
                <th>Oprávnenie:</th>
                <th>Detail:</th>
            </tr>
            {users}
        </table>)
};

export default userList;