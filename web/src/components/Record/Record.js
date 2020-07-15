import React from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

function Record(props) {
  return (
    <>
      <h1>Poznámky a ich vkladanie:</h1>
      <Formik
        initialValues={{desc: '', date: ''}}
        validationSchema={Yup.object({
          desc: Yup.string()
            .required('Povinné!'),
          date: Yup.string()
            .required('Povinné!'),
        })}
        onSubmit={(values) => {
          setTimeout(() => {
            props.save(values)
          }, 400);
        }}
      >
        <Form className="auth-form">
          <div className="form-control">
            <label htmlFor="desc">Popis poznámky:</label>
            <Field name="desc" type="text"/>
            <ErrorMessage name="desc"/>
          </div>
          <div className="form-control">
            <label htmlFor="date">Dátum poznámky:</label>
            <Field name="date" type="date"/>
            <ErrorMessage name="date"/>
          </div>
          <button className="btn" type="submit">Zapísať poznámku</button>
        </Form>
      </Formik>
      <div className="attendance-body">
        {props.data.map(dat => (
          <div className="attendance-item">
            <div>
              <p>{new Date(dat.date).toLocaleTimeString()}</p>
              <p>{dat.desc}</p>
            </div>
            <button onClick={() => props.remove(dat.id)} className={`btn red`}>Odstrániť</button>
          </div>
        ))}
      </div>
      {console.log('records', props.data)}
    </>
  )
}

export default Record