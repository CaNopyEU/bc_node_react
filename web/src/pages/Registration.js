import React, {Component} from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';


import './Auth.css';
import AuthContext from '../context/auth-context';

class RegistrationPage extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      success: '',
      username: ''
    }
  }

  submitRegister = (values) => {
    const requestBody = {
      query: `
                    mutation CreateUser($username: String!, $password: String!, $role: String!) {
                        createUser(username: $username, password: $password, role: $role, active: true) {
                            id
                            username
                            role
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
          if (resData.data.createUser.username) {
            this.setState({
              success: `Nový používateľ "${resData.data.createUser.username}" bol úspešne vytvorený`
            })
          }
        }
      )
      .catch(err => {
        this.setState({errors: 'Nepodarilo sa nového používateľa vytvoriť'})
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h1>Registrácia nového používateľa</h1>
        <Formik
          initialValues={{username: '', password: '', role: ''}}
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
              .required('Povinné!')
          })}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              this.submitRegister(values)
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="auth-form">
            {
              this.state.success &&
              <div className="form-control success">
                <label>{this.state.success}</label>
              </div>
            }
            {
              this.state.errors &&
              <div className="form-control errors">
                <label>{this.state.errors}</label>
              </div>
            }
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
            <button className="btn" type="submit">Vytvoriť účet</button>
          </Form>
        </Formik>
      </>
    );
  }
}

export default RegistrationPage;