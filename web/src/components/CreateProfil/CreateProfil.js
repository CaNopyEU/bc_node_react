import React, {Component} from "react";

class CreateProfil extends Component {

  constructor(props) {
    super(props);
    this.firstNameEl = React.createRef();
    this.lastNameEl = React.createRef();
    this.emailEl = React.createRef();
    this.cityEl = React.createRef();
    this.streetEl = React.createRef();
    this.streetNumEl = React.createRef();
    this.phoneEl = React.createRef();
    this.dobEl = React.createRef();
    this.mainTeacherEl = React.createRef();
    this.state = {
      errors: '',
      success: ''
    }
  }
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
      </form>)
  }
}

export default CreateProfil

