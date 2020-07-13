import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function ProfileParentEdit(props) {
  function submitHandler(values) {
    const requestBody = {
      query: `
                    mutation UpdateParent($first_name: String!, $last_name: String!, $email:  String!, $phone: Float!, $dob: String!, $title_before: String, $title_after: String){
                        updateParent(id: ${props.user.id}, first_name: $first_name, last_name: $last_name, email: $email, phone: $phone, dob: $dob, title_before: $title_before, title_after: $title_after) {
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
                `,
      variables: {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        dob: values.dob,
        phone: values.phone,
        title_after: values.title_after,
        title_before: values.title_before
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
        props.update('parent', resData.data.updateParent);
        props.editHandler();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {console.log('parent updateing user', props.user)}
      <Formik
        initialValues={{
          first_name: props.user.first_name,
          last_name: props.user.last_name,
          email: props.user.email,
          dob: props.user.dob,
          phone: props.user.phone,
          title_before: props.user.title_before,
          title_after: props.user.title_after
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
          phone: Yup.string()
            .required('Povinné!'),
          dob: Yup.string()
            .required('Povinné!')
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
            <label htmlFor="dob">Dátum narodenia:</label>
            <Field name="dob" type="date"/>
            <ErrorMessage name="dob"/>
          </div>
          <div className="form-control">
            <label htmlFor="phone">Telefónne číslo:</label>
            <Field name="phone" type="number"/>
            <ErrorMessage name="phone"/>
          </div>
          <div className="form-control">
            <label htmlFor="title_before">Titul pred menom:</label>
            <Field name="title_before" type="text"/>
            <ErrorMessage name="title_before"/>
          </div>
          <div className="form-control">
            <label htmlFor="title_after">Titul za menom:</label>
            <Field name="title_after" type="text"/>
            <ErrorMessage name="title_after"/>
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

export default ProfileParentEdit