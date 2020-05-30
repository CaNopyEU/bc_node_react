import React from "react";

import UserItem from './UserItem/UserItem';

import './UsersList.css';

const userList = props => {
    console.log(props)
    const users = props.users.map(user => {
        return (
            <UserItem
                key={user._id}
                userId={user._id}
                username={user.username}
                email={user.email}
                first={user.first}
                last={user.last}
                privilege={user.privilege}
            />
        )
    })
    return (
        <table className="users__list">
            <tr className="users__list-item">
                <th>Prihlasovacie meno:</th>
                <th>Email:</th>
                <th>Meno:</th>
                <th>Priezvisko:</th>
                <th>Oprávnenie:</th>
                <th>Detail:</th>
            </tr>
            {users}
        </table>)
};

export default userList;