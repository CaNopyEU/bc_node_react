import React, {Component} from "react";

import UsersList from '../components/Users/UsersList/UsersList';
import Spinner from '../components/Spinner/Spinner';
import './Users.css';

class Users extends Component {
    state = {
        isLoading: false,
        users: [],
    }

    isActive = true;

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                    query {
                        users {
                            _id
                            username
                            first
                            last
                            privilege
                            email
                        }
                    }
                `
        };

        fetch('http://localhost:8000/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                const users = resData.data.users;
                if (this.isActive) {
                    this.setState({users: users, isLoading: false});
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false})
            });
    }

    render() {
        return (
            <>
                {this.state.isLoading ? <Spinner/> : <UsersList users={this.state.users} />}
            </>
        )
    }
}

export default Users;