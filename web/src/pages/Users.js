import React, {Component} from "react";

import UsersList from '../components/Users/UsersList/UsersList';
import Modal from '../components/Modal/Modal';
import Spinner from '../components/Spinner/Spinner';
import './Users.css';
import Backdrop from "../components/Backdrop/Backdrop";
import CreateProfile from "../components/CreateProfil/CreateProfile";
import Profile from "../components/Profile/Profile";
import Registration from './Registration';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

class Users extends Component {
  state = {
    creating: false,
    isLoading: false,
    users: [],
    selectedUser: null,
    userInfo: null,
    classes: [],
    editUser: false,
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
                            active
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
                            classId
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

  modalCancelHandler = () => {
    this.setState({creating: false, selectedUser: null, userInfo: null, editUser: null});
  };

  handleCreated = () => {
    this.fetchUser(this.state.selectedUser.id, this.state.selectedUser.role);
  }

  handleUpdateStudent = (user) => {
    const prevState = this.state.userInfo;
    this.setState({
      userInfo: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        dob: user.dob,
        city: user.city,
        street: user.street,
        street_num: user.street_num,
        phone: user.phone,
        desc: user.desc,
        classId: user.classId,
        groups: prevState.groups,
        parent: prevState.parent
      }
    })
  }

  handleUpdateParent = (user) => {
    const prevState = this.state.userInfo;
    this.setState({
      userInfo: {
        id: prevState.id,
        first_name: prevState.first_name,
        last_name: prevState.last_name,
        dob: prevState.dob,
        city: prevState.city,
        street: prevState.street,
        street_num: prevState.street_num,
        phone: prevState.phone,
        desc: prevState.desc,
        classId: prevState.classId,
        groups: prevState.groups,
        parent: user
      }
    })
  }

  handleUpdateUser(id, user) {
    this.state.selectedUser.role === 'teacher' ?
      (this.setState({
        userInfo: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          title_before: user.title_before,
          title_after: user.title_after,
          email: user.email,
          dob: user.dob,
          city: user.city,
          street: user.street,
          street_num: user.street_num,
          phone: user.phone,
          main_teacher: user.main_teacher
        }
      }))
      :
      id === 'student' ?
        this.handleUpdateStudent(user)
        :
        this.handleUpdateParent(user)
  };

  handleChangeUser(useris) {
    this.setState(prevState => {
      const selectedUser = prevState.users.find(e => e.id === useris.id);
      return {editUser: selectedUser};
    })
  }

  processUserUpdate(values) {
    const requestBody = {
      query: `
                    mutation UpdateUser($username: String!, $password: String!, $role: String!) {
                        updateUser(id: ${this.state.editUser.id}, username: $username, password: $password, role: $role) {
                            id
                            username
                            role
                            active
                        }
                    }
                `,
      variables: {
        username: values.username,
        password: values.password,
        role: values.role
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
        this.handleRemoveUserConfirm(resData.data.updateUser, resData.data.updateUser.active);
        this.modalCancelHandler()
      })
      .catch(err => {
        this.setState({errors: 'Húuups, došlo k neočakávanej chybe'})
        console.log(err);
      });
  }

  deleteUser(user) {
    const requestBody = {
      query: `
                    mutation{
                      activateUser(id: ${user.id})
                      {
                        id
                        active
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
        this.handleRemoveUserConfirm(user, resData.data.activateUser.active)
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleRemoveUserConfirm(duser, status) {
    const elIndex = this.state.users.findIndex(user => user.id === duser.id);
    let newUsers = [...this.state.users];
    newUsers[elIndex] = {
      ...newUsers[elIndex],
      id: duser.id,
      username: duser.username,
      role: duser.role,
      active: status,
    }
    this.setState({
      users: newUsers
    })
  }


  render() {
    return (
      <>
        {(this.state.creating || this.state.selectedUser || this.state.editUser) && <Backdrop/>}
        {this.state.selectedUser && (
          <Modal
            title={this.state.selectedUser.username}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            {this.state.userInfo ?
              <Profile
                role={this.state.selectedUser.role}
                user={this.state.userInfo}
                handleUpdate={this.handleUpdateUser.bind(this)}
                classes={this.state.classes}
              />
              :
              <CreateProfile
                handleCreated={this.handleCreated}
                userId={this.state.selectedUser.id}
                role={this.state.selectedUser.role}
                classes={this.state.classes}
              />
            }
          </Modal>)}
        {this.state.editUser && (
          <Modal
            title={this.state.editUser.username}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <Formik
              initialValues={{username: this.state.editUser.username, password: '', role: this.state.editUser.role}}
              validationSchema={Yup.object({
                username: Yup.string()
                  .max(15, 'Môže byť maximálne 15 znakov dlhé')
                  .min(5, 'Musí byť minimalne 5 znakov dlhé')
                  .required('Prihlasovacie meno je potrebé vyplniť!'),
                password: Yup.string()
                  .max(20, 'Môže byť maximálne 20 znakov dlhé')
                  .min(5, 'Musí byť minimalne 5 znakov dlhé')
                  .required('Heslo je potrebé vyplniť!'),
                role: Yup.string()
                  .oneOf(
                    ['admin', 'teacher', 'student'], 'Nesprávna hodnota'
                  )
                  .required('req')
              })}
              onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                  this.processUserUpdate(values)
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form className="auth-form">
                <div className="form-control">
                  <label htmlFor="username">Prihlasovacie meno:</label>
                  <Field name="username" type="text"/>
                  <ErrorMessage name="username"/>
                </div>
                <div className="form-control">
                  <label htmlFor="password">Heslo:</label>
                  <Field name="password" type="password"/>
                  <ErrorMessage name="password"/>
                </div>
                <div className="form-control">
                  <label htmlFor="role">Pozícia v systéme</label>
                  <Field name="role" as="select">
                    <option value="">--Vyberte--</option>
                    <option value="admin">Administrátor</option>
                    <option value="teacher">Učiteľ</option>
                    <option value="student">Študent</option>
                  </Field>
                  <ErrorMessage name="role"/>
                </div>
                <button className="btn" type="submit">Upraviť účet</button>
              </Form>
            </Formik>
          </Modal>
        )
        }
        {this.state.isLoading ? <Spinner/> :
          <UsersList
            users={this.state.users}
            onViewDetail={this.showDetailHandler}
            onDelete={this.deleteUser.bind(this)}
            onEdit={this.handleChangeUser.bind(this)}
          />
        }
      </>
    )
  }
}

export default Users;