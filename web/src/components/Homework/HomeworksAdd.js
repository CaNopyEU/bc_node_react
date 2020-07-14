import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function HomeworkAdd(props) {

  function submitHandler(values) {

      let requestBody = {
        query: `
                    mutation CreateLecture($name: String!, $desc: String, $deadline: String!, $lectureId: Int!) {
                      homeworkCreate(name: $name, desc: $desc, deadline: $deadline, groupId:${props.skupina.id}, teacherId: ${props.myId} , lectureId: $lectureId){
                        id
                        name
                        desc
                        deadline
                      }
                    }
                `,
        variables: {
          name: values.title,
          desc: values.desc,
          deadline: values.deadline,
          lectureId: parseInt(values.lecture, 10),
        }
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
          alert(`Domáca úloha bola úspešne pridaná`)
        })
        .catch(err => {
          console.log(err);
        });
  }

  return(
    <div>
      <h1>Pridať domácu úlohu:</h1>
      <Formik
        initialValues={{lecture: '', title: '', desc: '', deadline: ''}}
        validationSchema={Yup.object({
          lecture: Yup.string()
            .required('povinné'),
          title:  Yup.string()
            .required('povinné'),
          deadline: Yup.string()
            .required('povinné'),
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
            <label htmlFor="title">Názov domácej úlohy:</label>
            <Field name="title" type="text"/>
            <ErrorMessage name="title"/>
          </div>
          <div className="form-control">
            <label htmlFor="desc">Detail domácej úlohy:</label>
            <Field name="desc" type="text"/>
          </div>
          <div className="form-control">
            <label htmlFor="deadline">Dátum odovzdania:</label>
            <Field name="deadline" type="date"/>
            <ErrorMessage name="deadline"/>
          </div>
          <div className="form-control">
            <label htmlFor="lecture">Predmet:</label>
            <Field name="lecture" as="select">
              <option value="">--Vyberte--</option>
              {props.lectures.map(lecture => (
                <option value={lecture.id}>{lecture.lecture}</option>
              ))}
            </Field>
            <ErrorMessage name="lecture"/>
          </div>
          <button className="btn" type="submit">Vytvoriť domácu úlohu</button>
        </Form>
      </Formik>
    </div>
  )
}

export default HomeworkAdd