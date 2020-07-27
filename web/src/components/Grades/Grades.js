import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import GradesView from "./GradesView";

function Grades(props) {

  const [grades, setGrades] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(props.lectures[0]);
  console.log('this fucking lecture', selectedLecture);
  useEffect(() => {
    fetchGrades(selectedLecture.id);
  }, []);

  function fetchGrades(lectureId) {
    const requestBody = {
      query: `
                   query{
                      gradesByStudLec(studentId:${props.student.id},lectureId: ${lectureId}){
                        id
                        grade
                        teacherId
                        studentId
                      }
                    }
                `
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
        setGrades(resData.data.gradesByStudLec);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function deleteGrade(id) {
    const requestBody = {
      query: `
                   mutation{
                      deleteGrade(id:${id}){
                        id
                      }
                    }
                `
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
        const newGrades = grades.filter(grade => {
          return grade.id !== id;
        });
        return setGrades(newGrades)
        //setGrades(resData.data.gradesByStudLec);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleChangeLecture(value) {
      setSelectedLecture(value);
      fetchGrades(value.id)
  }

  function gradeClickHandler(id) {
    const r = window.confirm('Vybraná známka bude zmazaná')
    if (r === true) {
      deleteGrade(id)
    }
  }
  function insertGrade(values) {
    const lectureId = selectedLecture.id;
    const requestBody = {
      query: `
                    mutation CreateGrade($grade: Int!, $date: String!, $studentId: Int!, $lectureId: Int!){
                      createGrade(grade: $grade, teacherId: ${props.teacherId}, date: $date, studentId: $studentId, lectureId: $lectureId) {
                        id
                        grade
                        date
                        lectureId
                        teacherId
                        studentId
                      }
                    }
                `,
      variables: {
        grade: Number(values.grade),
        studentId: props.student.id,
        lectureId: Number(lectureId),
        date: values.date
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
        fetchGrades(lectureId)
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="homework-body">
      <h1>Zápis známok pre: {props.student.first_name} {props.student.last_name}</h1>
      <div className="grades-buttons">
        {props.lectures.map(lecture => (
          <button onClick={() => handleChangeLecture(lecture)}
                  className={`btn grades-btn ${lecture.id === selectedLecture.id ? 'selected' : ''}`}>{lecture.lecture}</button>
        ))}
      </div>
      <GradesView delete={gradeClickHandler} grades={grades}/>
      <h1>Oznámkujte žiaka z predmetu: {selectedLecture.lecture}</h1>
      <Formik
        initialValues={{grade: '', date: ''}}
        validationSchema={Yup.object({
          date: Yup.date()
            .required('Povinné'),
          grade: Yup.string()
            .oneOf(
              ['1', '2', '3', '4', '5'], 'Nesprávna hodnota'
            )
            .required('Povinné')
        })}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            insertGrade(values)
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="auth-form">
          <div className="form-control">
            <label htmlFor="grade">Známka:</label>
            <Field name="grade" as="select">
              <option value="">--Vyberte--</option>
              <option value="1">Výborný</option>
              <option value="2">Chválitebný</option>
              <option value="3">Dobrý</option>
              <option value="4">Dostatočný</option>
              <option value="5">Nedostatočný</option>
            </Field>
            <ErrorMessage name="lectureId"/>
          </div>
          <div className="form-control">
            <label htmlFor="date">Dátum udelenia známky:</label>
            <Field name="date" type="date"/>
            <ErrorMessage name="date"/>
          </div>
          <button className="btn" type="submit">Oznámkovať</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Grades
