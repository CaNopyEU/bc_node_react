import React, {Component} from "react";

import UsersList from '../components/Users/UsersList/UsersList';
import Modal from '../components/Modal/Modal';
import Spinner from '../components/Spinner/Spinner';
import './Users.css';
import Backdrop from "../components/Backdrop/Backdrop";
import CreateProfile from "../components/CreateProfil/CreateProfile";

class Users extends Component {
  state = {
    creating: false,
    isLoading: false,
    users: [],
    selectedUser: null,
    userInfo: null,
    classes: []
  }
  isActive = true;

  componentDidMount() {
    this.fetchUsers();
    this.fetchClasses();
  }

  fetchUsers() {
    this.setState({isLoading: true});
    const requestBody = {
      query: `
                    query {
                        users {
                            id
                            username
                            role
                        }
                    }
                `
    };

    fetch('http://localhost:8000', {
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
  fetchClasses() {
    this.setState({isLoading: true});
    const requestBody = {
      query: `
                    query{
                      classes{
                        id
                        classType
                        year
                        groups{
                          id
                          title 
                        }
                      }
                    }
                `
    };

    fetch('http://localhost:8000', {
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
        const classes = resData.data.classes;
        if (this.isActive) {
          this.setState({classes: classes, isLoading: false});
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });
  }
  fetchUser(userId, role) {
    let requestBody = '';
    if (role === 'teacher') {
      requestBody = {
        query: `
                    query{
                          teacherByUser(id:${userId}){
                            id
                            first_name
                            last_name
                            email
                            city
                            street
                            street_num
                            phone
                            dob
                            main_teacher
                          }
                        }
                `
      };
    } else {
      requestBody = {
        query: `
                    query{
                          studentByUser(id:${userId}){
                            id
                            first_name
                            last_name
                           
                          }
                        }
                `
      };
    }


    fetch('http://localhost:8000', {
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
        let userInfo = []
        if (role === 'teacher'){
          userInfo = resData.data.teacherByUser;
        } else {
          userInfo = resData.data.studentByUser;
        }
        this.setState({userInfo: userInfo, isLoading: false});
      })
      .catch(err => {
        console.log(err);
      });
  }

  showDetailHandler = userId => {
    this.setState(prevState => {
      const selectedUser = prevState.users.find(e => e.id === userId);
        this.fetchUser(userId, selectedUser.role);
      return {selectedUser: selectedUser};
    })
  }

  modalCreateProfileHandler = (userId, role) => {
    return <CreateProfile/>
  }


  modalCancelHandler = () => {
    this.setState({creating: false, selectedUser: null, userInfo: null});
  };

  render() {
    console.log('user info:', this.state.userInfo)
    return (
      <>
        {(this.state.creating || this.state.selectedUser) && <Backdrop/>}
        {this.state.selectedUser && (
          <Modal
            title={this.state.selectedUser.username}
            canCancel
            canEdit
            onCancel={this.modalCancelHandler}
            editText="Upraviť používateľa"
            onEdit={this.modalCreateProfileHandler(this.state.selectedUser.id, this.state.selectedUser.role)}
          >
            {this.state.selectedUser.role === 'teacher' &&

            <>
              {this.state.userInfo &&
              <>
                <tbody>
                <tr>
                  <td>Meno:</td>
                  <td>{this.state.userInfo.first_name}</td>
                </tr>
                <tr>
                  <td>Priezvisko:</td>
                  <td>{this.state.userInfo.last_name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{this.state.userInfo.email}</td>
                </tr>
                <tr>
                  <td>Mesto:</td>
                  <td>{this.state.userInfo.city}</td>
                </tr>
                <tr>
                  <td>Ulica:</td>
                  <td>{this.state.userInfo.street} / {this.state.userInfo.street_num}</td>
                </tr>
                <tr>
                  <td>Tel. číslo:</td>
                  <td>{this.state.userInfo.phone}</td>
                </tr>
                <tr>
                  <td>Dátum narodenia:</td>
                  <td>{this.state.userInfo.dob}</td>
                </tr>
                <tr>
                  <td>Je tridnym učiteľom?</td>
                  <td>{this.state.userInfo.main_teacher ? 'Áno' : 'Nie'}</td>
                </tr>
                </tbody>
              </>
              }
              {
                !this.state.userInfo &&
                <>
                  <h1>Tomuto učiteľovi doposiaľ nebol vytvorený profil.
                    <br/>
                    Prajete si ho vytvoriť?
                  </h1>
                  <CreateProfile userId={this.state.selectedUser.id} role={this.state.selectedUser.role}/>
                </>
              }
            </>
            }
            {this.state.selectedUser.role === 'student' &&
            <>
              {this.state.userInfo &&
              <>
                <tbody>
                <tr>
                  <td>Meno:</td>
                  <td>{this.state.userInfo.first_name}</td>
                </tr>
                <tr>
                  <td>Priezvisko:</td>
                  <td>{this.state.userInfo.last_name}</td>
                </tr>
                </tbody>
              </>
              }
              {
                !this.state.userInfo &&
                <>
                  <h1>Tomuto študentovi doposiaľ nebol vytvorený profil.
                    <br/>
                    Prajete si ho vytvoriť?
                  </h1>
                  <CreateProfile userId={this.state.selectedUser.id} role={this.state.selectedUser.role} classes={this.state.classes}/>
                </>
              }
            </>
            }
            {this.state.selectedUser.role === 'admin' &&
            <h1>Toto je admin</h1>
            }

          </Modal>)}
        {this.state.isLoading ? <Spinner/> :
          <UsersList users={this.state.users} onViewDetail={this.showDetailHandler}/>}
      </>
    )
  }
}

export default Users;