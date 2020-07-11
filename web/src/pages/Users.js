import React, {Component} from "react";

import UsersList from '../components/Users/UsersList/UsersList';
import Modal from '../components/Modal/Modal';
import Spinner from '../components/Spinner/Spinner';
import './Users.css';
import Backdrop from "../components/Backdrop/Backdrop";
import CreateProfile from "../components/CreateProfil/CreateProfile";
import Profile from "../components/Profile/Profile";

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
                            title_before
                            title_after
                            email
                            city
                            street
                            street_num
                            phone
                            dob
                            main_teacher
                            class{
                              id
                              classType
                              year
                            }
                            lectures{
                              id
                              lecture
                              lectureType
                            }
                            groups{
                              id
                              title 
                            }
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
                            city
                            street
                            street_num
                            dob
                            desc
                            parent{
                              id
                              first_name
                              last_name
                              email
                              dob
                              phone
                              title_before
                              title_after
                            }
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
        if (role === 'teacher') {
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

  modalEditProfileHandler = (userId, role) => {
    return alert('cozeee')
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
            onEdit={() => this.modalEditProfileHandler(this.state.selectedUser.id, this.state.selectedUser.role)}
          >
            {this.state.userInfo ?
              <Profile
                role={this.state.selectedUser.role}
                user={this.state.userInfo}
              />
              :
              <CreateProfile
                userId={this.state.selectedUser.id}
                role={this.state.selectedUser.role}
                classes={this.state.classes}
              />
            }
          </Modal>)}
        {this.state.isLoading ? <Spinner/> :
          <UsersList
            users={this.state.users}
            onViewDetail={this.showDetailHandler}
          />
        }
      </>
    )
  }
}

export default Users;