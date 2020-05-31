import React, {Component} from "react";

import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.usernameEl = React.createRef();
    this.passwordEl = React.createRef();
    this.roleEl = React.createRef();
    this.state = {
      err: ''
    }
  }


  submitHandler = (event) => {
    event.preventDefault();
    const username = this.usernameEl.current.value;
    const password = this.passwordEl.current.value;


    if (username.trim().length === 0 || password.trim().length === 0) {
      this.setState({
        err: 'Nevyplnili ste všetky požadované údaje'
      });
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
        if(resData.errors) {
            this.setState({
                err: 'Ľutujeme zadaná kombinácia údajov nieje správna'
            })
        } else {
        this.context.login(
          resData.data.login.token,
          resData.data.login.userId,
          resData.data.login.tokenExpiration,
          resData.data.login.role
        );}
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.err)
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        {(this.state.err) &&
        <div className="form-control errors">
          <label htmlFor="text">{this.state.err}</label>
        </div>
        }
        <div className="form-control">
          <label htmlFor="text">Používateľské meno</label>
          <input type="text" id="text" ref={this.usernameEl}/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Heslo</label>
          <input type="password" id="password" ref={this.passwordEl}/>
        </div>
        <div className="form-actions">
          <button type="input">Prihlásiť</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;