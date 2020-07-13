import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function ProfileTeacherEdit(props) {

  function submitHandler(values) {
    const requestBody = {
      query: `
                    mutation UpdateTeacher($first_name: String!, $last_name: String!, $title_before: String, $title_after: String, $email:  String!,$city: String!, $street: String!, $street_num: Float!, $phone: Float!, $dob: String!, $main_teacher: Boolean!){
                        updateTeacher(id: ${props.user.id}, first_name: $first_name, last_name: $last_name, title_before: $title_before, title_after: $title_after email: $email, city: $city, street: $street, street_num: $street_num, phone: $phone, dob: $dob, main_teacher: $main_teacher) {
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
                        }
                    }
                `,
      variables: {
        first_name: values.first_name,
        last_name: values.last_name,
        title_before: values.title_before,
        title_after: values.title_after,
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
      .then(resData => {
        props.update(props.user.id, resData.data.updateTeacher);
        props.editHandler();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: props.user.first_name,
          last_name: props.user.last_name,
          title_before: props.title_before,
          title_after: props.title_after,
          email: props.user.email,
          city: props.user.city,
          street: props.user.street,
          street_num: props.user.street_num,
          phone: props.user.phone,
          dob: props.user.dob,
          main_teacher: props.user.main_teacher
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
            <label htmlFor="title_before">Titul pred menom:</label>
            <Field name="title_before" type="text"/>
          </div>
          <div className="form-control">
            <label htmlFor="title_after">Titul za menom:</label>
            <Field name="title_after" type="text"/>
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
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
          <div>
            <button className="btn green" type="submit">Uložiť zmeny</button>
            <button onClick={props.editHandler} className="btn">Zrušiť úpravu</button>
          </div>
        </Form>
      </Formik>

    </>
  )
}

export default ProfileTeacherEdit