import React, {Component} from "react";

import './Auth.css';
import AuthContext from '../context/auth-context';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

class AuthPage extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      err: ''
    }
  }


  submitHandler = (values) => {
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
        username: values.username,
        password: values.password
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
    return (
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, 'Môže byť maximálne 15 znakov dlhé')
            .min(5,'Musí byť minimalne 5 znakov dlhé')
            .required('Prihlasovacie meno je potrebé vyplniť!'),
          password: Yup.string()
            .max(20, 'Môže byť maximálne 20 znakov dlhé')
            .min(5,'Musí byť minimalne 5 znakov dlhé')
            .required('Heslo je potrebé vyplniť!'),
        })}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            this.submitHandler(values)
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="auth-form">
          {
            this.state.err &&
            <div className="form-control errors">
              <label>{this.state.err}</label>
            </div>
          }
          <div className="form-control">
            <label htmlFor="username">Prihlasovacie meno:</label>
            <Field name="username" type="text"/>
            <ErrorMessage  name="username"/>
          </div>
          <div className="form-control">
            <label htmlFor="password" >Heslo:</label>
            <Field name="password" type="password"/>
            <ErrorMessage name="password"/>
          </div>
          <button className="btn" type="submit">Prihlásiť</button>
        </Form>
      </Formik>
    );
  }
}

export default AuthPage;