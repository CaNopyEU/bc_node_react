import React, {useState, useEffect} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import OneFromArray from '../../OneFromArray';

import '../Profile.css';

function ProfileTeacherLecture(props) {

  const [lectures, setLectures] = useState([]);
  const [teacherlectures, setTeacherLectures] = useState(props.lectures);

  useEffect(() => {
    fetchLectures();
  }, []);

  function fetchLectures() {
    const requestBody = {
      query: `
                    query {
                        lectures {
                            id
                            lecture
                            lectureType
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
        setLectures(resData.data.lectures);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function insertLecture(values) {
    const requestBody = {
      query: `
                    mutation CreateTeacherLecture($lectureId: Int! $teacherId: Int!){
                      createTeacherLecture(lectureId: $lectureId, teacherId: $teacherId){
                        lectures{
                          id
                          lecture
                          lectureType
                        }
                        teachers{
                          id
                        }
                      }
                    }
                `,
      variables: {
        lectureId: parseInt(values.lecture, 10),
        teacherId: props.id
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
        console.log('after submit data', resData.data.createTeacherLecture.lectures)
        setTeacherLectures(prevState => {
          const updatedTeacherLecture = [...prevState];
          updatedTeacherLecture.push({
            id: resData.data.createTeacherLecture.lectures.id,
            lecture: resData.data.createTeacherLecture.lectures.lecture,
            lectureType: resData.data.createTeacherLecture.lectures.lectureType,
          })
          return setTeacherLectures(updatedTeacherLecture);
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  function deleteLecture(lectureId) {

    const r = window.confirm('Prajete si odobrat predmet?')
    if (!r) {
      return
    }

    const requestBody = {
      query: `
                    mutation {
                      deleteTeacherLecture(lectureId: ${lectureId}, teacherId: ${props.id}){
                        lectures{
                          id
                        }
                        teachers{
                          id
                        }
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
        return setTeacherLectures(teacherlectures.filter(lecture => lecture.id !== lectureId));
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      {console.log('this lectures in teacher', lectures)}
      {console.log('teachers lectures', props.lectures)}
      <div className="profile-lectures-control">
        <h1>Učiteľ vyučuje predmety:</h1>
        {teacherlectures.map((lecture) => <div className="in-row" style={{paddingBottom: 10}}>
          <div
            className="groups-form-control">{lecture.lecture}({(lecture.lectureType) ? 'Známkovaný' : 'Výchovný'})
          </div>
          <button onClick={() => deleteLecture(lecture.id)} className="btn red">Odstrániť</button>
        </div>)}

        <Formik
          initialValues={{lecture: ''}}
          validationSchema={Yup.object({
            lecture: Yup.string()
              .required()
          })}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              insertLecture(values);
//            alert(JSON.stringify(values))
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="in-row">
            <div className="form-control">
              <div>
                <Field name="lecture" as="select">
                  <option value="">--Vyberte--</option>
                  {
                    lectures.map((lecture) =>
                      <option
                        value={lecture.id}>{lecture.lecture}({(lecture.lectureType) ? 'Známkovaný' : 'Výchovný'})</option>
                    )
                  }
                </Field>
              </div>
            </div>
            <button className="plus-button" type="submit">Pridať skupinu</button>
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default ProfileTeacherLecture;