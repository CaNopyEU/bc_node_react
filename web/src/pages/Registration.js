import React, {Component} from "react";

import './Auth.css';
import AuthContext from '../context/auth-context';

class RegistrationPage extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.usernameEl = React.createRef();
    this.passwordEl = React.createRef();
    this.roleEl = React.createRef();
    this.state = {
      errors: '',
      success: ''
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    const username = this.usernameEl.current.value;
    const password = this.passwordEl.current.value;
    const role = this.roleEl.current.value;

    if (username.trim().length === 0 || password.trim().length === 0) {
      this.setState({errors: 'Prosím vyplnte všetky údaje'})
      return;
    } else if (!role) {
      this.setState({errors: 'Prosím vyplnte všetky údaje'})
      return;
    }


    const requestBody = {
      query: `
                    mutation CreateUser($username: String!, $password: String!, $role: String!) {
                        createUser(username: $username, password: $password, role: $role) {
                            id
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
        this.setState({
          success: 'Nový používateľ bol úspešne vytvorený'
        })
        return res.json();
      })
      .catch(err => {
        this.setState({errors: 'Húuups, došlo k neočakávanej chybe'})
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        {this.state.errors &&
        <div className="form-control errors">
          <label>{this.state.errors}</label>
        </div>
        }
        {
          this.state.success &&
          <div className="form-control success">
            <label>{this.state.success}</label>
          </div>
        }
        <div className="form-control">
          <label htmlFor="text">Prihlasovacie meno:</label>
          <input type="text" id="text" ref={this.usernameEl}/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Heslo:</label>
          <input type="password" id="password" ref={this.passwordEl}/>
        </div>
        <div className="form-control">
          <label htmlFor="role">Pozícia v systéme</label>
          <select id="role" ref={this.roleEl} defaultValue="asd">
            <option value={null}></option>
            <option value="admin">Administrátor</option>
            <option value="teacher">Učiteľ</option>
            <option value="student">Študent</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="input">Registrovať</button>
        </div>
      </form>
    );
  }
}

export default RegistrationPage;