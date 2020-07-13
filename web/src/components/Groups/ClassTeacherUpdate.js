import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function ClassTeacherUpdate(props) {

  function submitHandler(values) {
    const requestBody = {
      query: `
                    mutation UpdateClass($classType: String, $year: Int, $teacherId: Int) {
                        updateClass(id: ${props.id}, classType: $classType, year: $year, teacherId: $teacherId) {
                            id
                            classType
                            year
                            teacher {
                              id
                              first_name
                              last_name
                              title_before
                              title_after
                            }
                        }
                    }
                `,
      variables: {
        classType: values.classType.toUpperCase(),
        year: values.year,
        teacherId: parseFloat(values.teacherId)
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
        return props.updateHandler(props.id, resData.data.updateClass);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Formik
        initialValues={{teacherId: props.thisClass.teacher.id, year: props.thisClass.year, classType: props.thisClass.classType}}
        validationSchema={Yup.object({
          classType: Yup.string()
            .required('Nazov predmetu je potrebé vyplniť!')
            .max(1, 'Označenie triedy nesmie presahovať jeden znak!'),
          year: Yup.number()
            .required('Rok je nutné vyplniť!')
            .max(9, 'Označenie triedy nesmie presahovať jedenomiestne číslo!'),
          teacherId: Yup.string()
            .required('Učiteľa je potrebné vybrať')
        })}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            submitHandler(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="change-teacher-form">
          <label htmlFor="classType">Trieda:</label>
          <Field name="classType" type="text"/>
          <ErrorMessage name="classType"/>
            <label htmlFor="year">Ročník:</label>
            <Field name="year" type="number"/>
            <ErrorMessage name="year"/>
          <label htmlFor="teacherId">Výber triedneho učiteľa:</label>
          <Field name="teacherId" as="select">
            <option
              value={props.thisClass.teacher.id}>{props.thisClass.teacher.title_before} {props.thisClass.teacher.first_name} {props.thisClass.teacher.last_name} {props.thisClass.teacher.title_after}</option>
            {props.teachers.map(teacher => (
              <option
                value={teacher.id}>{teacher.title_before} {teacher.first_name} {teacher.last_name} {teacher.title_after}</option>
            ))}
          </Field>
          <ErrorMessage name="teacherId"/>
          <button className="btn" type="submit">Upraviť triedu</button>
        </Form>
      </Formik>
    </>
  )
}

export default ClassTeacherUpdate