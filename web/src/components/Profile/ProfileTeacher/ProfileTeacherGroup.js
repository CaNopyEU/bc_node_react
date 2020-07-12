import React, {useState, useEffect} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

import '../Profile.css';

function ProfileTeacherGroup(props) {
  const [classes, setClasses] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
    fetchTeacherGroups();
  }, []);

  function fetchTeacherGroups() {
    const requestBody = {
      query: `
                    query{
                      classes{
                        id
                        classType
                        year
                        groups{
                          id
                          title
                        }
                      }
                  }
                `
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
          setClasses(resData.data.classes)
        }
      )
      .catch(err => {
        console.log(err);
      });
  }

  function fetchGroups() {
    const requestBody = {
      query: `
                    query{
                      classes{
                        id
                        classType
                        year
                        groups{
                          id
                          title
                        }
                      }
                  }
                `
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
          setClasses(resData.data.classes)
        }
      )
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <>
      {console.log('this props', props.groups)}
      {console.log('selected Skupina', groups)}
      <Formik
        initialValues={{class: '', group: ''}}
        validationSchema={Yup.object({
          class: Yup.string()
            .required('Triedu je potrebné vyplniť!'),
          group: Yup.string()
            .required('Skupinu je potrebné vyplniť!')
        })}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            alert(JSON.stringify(values))
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="auth-form in-row">
          <div className="form-control">
            <div>
              <label htmlFor="class">Vyberte triedu:</label>
              <Field name="class" as="select">
                <option value="">--Vyberte--</option>
                {
                  classes.map((oneClass) =>
                    <option onClick={() => setGroups(oneClass.groups)}
                            value={oneClass.id}>{oneClass.year}. {oneClass.classType}</option>
                  )
                }
              </Field>
              <ErrorMessage name="class"/>
            </div>
          </div>
          <div>
            <div className="form-control">
              <label htmlFor="group">Vyberte skupinu:</label>
              <Field name="group" as="select">
                <option value="">--Vyberte--</option>
                {
                  groups.map((group) =>
                    <option value={group.id}>{group.title}</option>
                  )
                }
              </Field>
              <ErrorMessage name="group"/>
            </div>
          </div>
          <button className="plus-button" type="submit">Pridať skupinu</button>
        </Form>
      </Formik>
    </>
  )
}

export default ProfileTeacherGroup;