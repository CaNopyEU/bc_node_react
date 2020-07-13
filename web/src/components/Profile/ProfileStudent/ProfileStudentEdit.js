import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function ProfileStudentEdit(props) {

  function submitHandler(values) {
    const requestBody = {
      query: `
                    mutation UpdateStudent($first_name: String!, $last_name: String!, $city: String!, $street: String!, $street_num: Float!, $dob: String!, $desc: String, $classId: Int!){
                        updateStudent(id: ${props.user.id}, first_name: $first_name, last_name: $last_name, city: $city, street: $street, street_num: $street_num, dob: $dob, desc: $desc, classId: $classId) {
                            id
                            first_name
                            last_name
                            city
                            street
                            street_num
                            dob
                            desc
                            classId
                        }
                    }
                `,
      variables: {
        first_name: values.first_name,
        last_name: values.last_name,
        city: values.city,
        street: values.street,
        street_num: values.street_num,
        dob: values.dob,
        classId: Number(values.class),
        desc: values.desc
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
        props.update('student', resData.data.updateStudent);
        props.editHandler();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {console.log('studen updateing user', props.user)}
      <Formik
        initialValues={{
          first_name: props.user.first_name,
          last_name: props.user.last_name,
          city: props.user.city,
          street: props.user.street,
          street_num: props.user.street_num,
          dob: props.user.dob,
          desc: props.user.desc,
          class: props.user.classId
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .max(15, 'Môže byť maximálne 15 znakov dlhé')
            .required('Povinné!'),
          last_name: Yup.string()
            .max(20, 'Môže byť maximálne 20 znakov dlhé')
            .required('Povinné!'),
          city: Yup.string()
            .required('Povinné!'),
          street: Yup.string()
            .required('Povinné!'),
          street_num: Yup.string()
            .required('Povinné!'),
          dob: Yup.string()
            .required('Povinné!'),
          class: Yup.string()
            .required('Povinne!')
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
            <label htmlFor="dob">Dátum narodenia:</label>
            <Field name="dob" type="date"/>
            <ErrorMessage name="dob"/>
          </div>
          <div className="form-control">
            <label htmlFor="desc">Poznámka ku študentovi:</label>
            <Field name="desc" type="text"/>
            <ErrorMessage name="desc"/>
          </div>
          <div className="form-control">
            <label htmlFor="class">Vyberte triedu:</label>
            <Field name="class" as="select">
              <option value="">--Vyberte--</option>
              {props.classes.map(oneClass => (
                <option value={oneClass.id}>{oneClass.year}. {oneClass.classType.toUpperCase()}</option>
              ))}
            </Field>
            <ErrorMessage name="class"/>
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

export default ProfileStudentEdit