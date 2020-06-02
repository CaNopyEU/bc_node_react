// Render Prop
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

function CreateProfile(props) {

  function submitHandler(values) {
    const requestBody = {
      query: `
                    mutation CreateTeacher($first_name: String!, $last_name: String!, $email:  String!,$city: String!, $street: String!, $street_num: Float!, $phone: Float!, $dob: String!, $main_teacher: Boolean!){
                        createTeacher(first_name: $first_name, last_name: $last_name, email: $email ,city: $city, street: $street, street_num: $street_num, phone: $phone, dob: $dob, main_teacher: $main_teacher,userId: ${props.userId}) {
                            id
                            first_name
                        }
                    }
                `,
      variables: {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        city: values.city,
        street: values.street,
        street_num: values.street_num,
        phone: values.phone,
        dob: values.dob,
        main_teacher: values.main_teacher
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
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          city: '',
          street: '',
          street_num: '',
          phone: '',
          dob: '',
          main_teacher: false
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .max(15, 'Môže byť maximálne 15 znakov dlhé')
            .required('Povinné!'),
          last_name: Yup.string()
            .max(20, 'Môže byť maximálne 20 znakov dlhé')
            .required('Povinné!'),
          email: Yup.string()
            .required('Povinné!'),
          city: Yup.string()
            .required('Povinné!'),
          street: Yup.string()
            .required('Povinné!'),
          street_num: Yup.string()
            .required('Povinné!'),
          phone: Yup.string()
            .required('Povinné!'),
          dob: Yup.string()
            .required('Povinné!'),
        })}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            submitHandler(values)
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="auth-form">
          <div className="form-control">
            <label htmlFor="first_name">Krstné meno:</label>
            <Field name="first_name" type="text"/>
            <ErrorMessage name="first_name"/>
          </div>
          <div className="form-control">
            <label htmlFor="last_name">Priezvisko:</label>
            <Field name="last_name" type="text"/>
            <ErrorMessage name="last_name"/>
          </div>
          <div className="form-control">
            <label htmlFor="email">email:</label>
            <Field name="email" type="text"/>
            <ErrorMessage name="email"/>
          </div>
          <div className="form-control">
            <label htmlFor="city">Mesto:</label>
            <Field name="city" type="text"/>
            <ErrorMessage name="city"/>
          </div>
          <div className="form-control">
            <label htmlFor="street">Ulica:</label>
            <Field name="street" type="text"/>
            <ErrorMessage name="street"/>
          </div>
          <div className="form-control">
            <label htmlFor="street_num">Číslo domu:</label>
            <Field name="street_num" type="number"/>
            <ErrorMessage name="street_num"/>
          </div>
          <div className="form-control">
            <label htmlFor="phone">Telefónne číslo:</label>
            <Field name="phone" type="number"/>
            <ErrorMessage name="phone"/>
          </div>
          <div className="form-control">
            <label htmlFor="dob">Dátum narodenia:</label>
            <Field name="dob" type="date"/>
            <ErrorMessage name="dob"/>
          </div>
          <div className="form-control flex">
            <label htmlFor="main_teacher" className="form-check-label">Je triednym učiteľom?</label>
            <Field type="checkbox" name="main_teacher" className="check"/>
          </div>
          <button className="btn" type="submit">Vytvoriť</button>
        </Form>
      </Formik>
    </>
  )
}

export default CreateProfile;