import React, {useState} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

function LectureEdit(props) {

  function submitHandler(values) {
    if (values.lectureType === 'true') {
      values.lectureType = true
    } else {
      values.lectureType = false
    }
    const requestBody = {
      query: `
                    mutation UpdateLecture($lecture: String, $lectureType: Boolean) {
                        updateLecture(id: ${props.lecture.id}, lecture: $lecture, lectureType: $lectureType) {
                            id
                            lecture
                            lectureType
                        }
                    }
                `,
      variables: {
        lecture: values.lecture,
        lectureType: values.lectureType
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
        props.updateHandler(props.lecture.id, resData.data.updateLecture.lecture, resData.data.updateLecture.lectureType);
        props.cancel()
        })
      .catch(err => {
        this.setState({errors: 'Húuups, došlo k neočakávanej chybe'})
        console.log(err);
      });
  };

  return (
    <>
      <Formik
        initialValues={{lecture: props.lecture.lecture, lectureType: props.lecture.lectureType}}
        validationSchema={Yup.object({
          lecture: Yup.string()
            .min(2, 'Názov predmetu musí byť dlhší ako 3 znaky'),
          lectureType: Yup.string()
            .oneOf(
              ['true', 'false'], 'Nesprávna hodnota'
            )
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
            <label htmlFor="lecture">Názov predmetu:</label>
            <Field name="lecture" type="text"/>
            <ErrorMessage name="lecture"/>
          </div>
          <div className="form-control">
            <label htmlFor="lecture">Typ predmetu:</label>
            <Field name="lectureType" as="select">
              <option value="">--Vyberte--</option>
              <option value="true">Známkovaný</option>
              <option value="false">Výchovný</option>
            </Field>
            <ErrorMessage name="lectureType"/>
          </div>
          <button className="btn" type="submit">Upraviť predmet</button>
        </Form>
      </Formik>
    </>
  )
}

export default LectureEdit