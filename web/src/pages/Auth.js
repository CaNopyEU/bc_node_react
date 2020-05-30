import React, {Component} from "react";

import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
    state = {
        isLogin: true
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
        this.roleEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin}
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const username = this.usernameEl.current.value;
        const password = this.passwordEl.current.value;


        if (username.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query Login($username: String!, $password: String!) {
                    login(username: $username, password: $password) {
                        userId
                        token
                        tokenExpiration
                        role
                    }
                }
            `,
            variables: {
                username: username,
                password: password
            }
        };

        if (!this.state.isLogin) {
            const role = this.roleEl.current.value;
            requestBody = {
                query: `
                    mutation CreateUser($username: String!, $password: String!, $role: String!) {
                        createUser(userInput: {username: $username, password: $password, role: $role}) {
                            username
                            role
                        }
                    }
                `,
                variables: {
                    username: username,
                    password: password,
                    role: role
                }
            };
        }

        fetch('http://localhost:8000/', {
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
                if (this.state.isLogin) {
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration,
                        resData.data.login.role
                    );
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="text">Username</label>
                    <input type="text" id="text" ref={this.usernameEl}/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordEl}/>
                </div>
                {
                    !this.state.isLogin &&
                    <>
                        <div className="form-control">
                            <label htmlFor="role">Privileges</label>
                            <select id="role" ref={this.roleEl}>
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>

                    </>
                }
                <div className="form-actions">
                    <button type="input">Submit</button>
                    <button type="button" onClick={this.switchModeHandler}>Switch
                        to {this.state.isLogin ? 'Signup' : 'Login'}</button>
                </div>
            </form>
        );
    }
}

export default AuthPage;