import React from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

function Attendance(props) {
  return (
    <><h1>Neprítomnosti a ich vkladanie:</h1>
      <Formik
        initialValues={{desc: '', date: '', pardon: ''}}
        validationSchema={Yup.object({
          desc: Yup.string()
            .required('Povinné!'),
          date: Yup.string()
            .required('Povinné!'),
          pardon: Yup.string()
            .oneOf(
              ['true', 'false'], 'Nesprávna hodnota'
            )
            .required('Povinné!')
        })}
        onSubmit={(values) => {
          setTimeout(() => {
            props.save(values)
          }, 400);
        }}
      >
        <Form className="auth-form">
          <div className="form-control">
            <label htmlFor="desc">Popis ku neprítomnosti:</label>
            <Field name="desc" type="text"/>
            <ErrorMessage name="desc"/>
          </div>
          <div className="form-control">
            <label htmlFor="date">Dátum neprítomnosti:</label>
            <Field name="date" type="date"/>
            <ErrorMessage name="date"/>
          </div>
          <div className="form-control">
            <label htmlFor="pardon">Ospravedlnená:</label>
            <Field name="pardon" as="select">
              <option value="">--Vyberte--</option>
              <option value="true">Áno</option>
              <option value="false">Nie</option>
            </Field>
            <ErrorMessage name="pardon"/>
          </div>
          <button className="btn" type="submit">Vytvoriť neprítomnosť</button>
        </Form>
      </Formik>
      <div className="attendance-body">
        {props.data.map(dat => (
          <div className="attendance-item">
            <div>
              <p>{new Date(dat.date).toLocaleTimeString()}</p>
              <p>{dat.desc}</p>
              <p>{dat.pardon ? 'Ospravedlnená' : 'Neospravedlnená'}</p>
            </div>
            <div>
              <button onClick={() => props.activate(dat.id)} className={`btn ${dat.pardon ? 'red' : 'green'}`}>Zmeniť
                stav
              </button>
              <button onClick={() => props.remove(dat.id)} className={`btn red`}>Odstrániť</button>
            </div>
          </div>
        ))}
      </div>
      {console.log('atendances', props.data)}
    </>
  )
}

export default Attendance