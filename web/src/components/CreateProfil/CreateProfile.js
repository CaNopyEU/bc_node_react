// Render Prop
import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

function CreateProfile(props) {
  const [step, setStep] = useState(false);
  const [parentId, setParentId] = useState('');
  const [groupId, setGroupId] = useState('');

  function submitHandler(values) {
    let requestBody = [];
    if (props.role === 'teacher') {
      requestBody = {
        query: `
                    mutation CreateTeacher($first_name: String!, $last_name: String!, $title_before: String, $title_after: String, $email:  String!,$city: String!, $street: String!, $street_num: Float!, $phone: Float!, $dob: String!, $main_teacher: Boolean!){
                        createTeacher(first_name: $first_name, last_name: $last_name, title_before: $title_before, title_after: $title_after email: $email, city: $city, street: $street, street_num: $street_num, phone: $phone, dob: $dob, main_teacher: $main_teacher,userId: ${props.userId}) {
                            id
                            first_name
                        }
                    }
                `,
        variables: {
          first_name: values.first_name,
          last_name: values.last_name,
          title_before: values.title_before,
          title_after: values.title_after,
          email: values.email,
          city: values.city,
          street: values.street,
          street_num: values.street_num,
          phone: values.phone,
          dob: values.dob,
          main_teacher: values.main_teacher
        }
      };
    } else {
      if (!step) {
        requestBody = {
          query: `
                    mutation CreateParent($first_name: String!, $last_name: String!, $email:  String!, $phone: Float!, $dob: String!, $title_before: String, $title_after: String){
                        createParent(first_name: $first_name, last_name: $last_name, email: $email, phone: $phone, dob: $dob, title_before: $title_before, title_after: $title_after) {
                            id
                        }
                    }
                `,
          variables: {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            dob: values.dob,
            title_before: values.title_before,
            title_after: values.title_after
          }
        };
      } else {
        requestBody = {
          query: `
                    mutation CreateStudent($first_name: String!, $last_name: String!, $city: String!, $street: String!, $street_num: Float!, $dob: String!, $desc: String, $classId: Int!){
                        createStudent(first_name: $first_name, last_name: $last_name, city: $city, street: $street, street_num: $street_num, dob: $dob, desc: $desc, classId: $classId, userId: ${props.userId}, parentId: ${parentId}) {
                            id
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
            desc: values.desc,
            classId: Number(values.class)
          }
        };
      }
    }
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
        if (props.role === 'student' && !step) {
          setStep(true)
          setParentId(resData.data.createParent.id)
        } else if (props.role === 'student' && step) {
          setStep(false)
          signStudentGroup(resData.data.createStudent.id)
        }
        props.handleCreated();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function signStudentGroup(studentId) {
    console.log(studentId)
    const requestBody = {
      query: `
                    mutation{
                      createStudentGroup(groupId: ${groupId}, studentId: ${studentId}){
                        groups{
                          id
                        }
                        students{
                          id
                        }                       
                      }
                    }
                `,
      variables: {}
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
        setStep(false)
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      {console.log('triedt', props.classes)}
      {console.log('selected group id', groupId)}
      {props.role === 'teacher' &&
      <>
        <h1>Tomuto učiteľovi doposiaľ nebol vytvorený profil.
          <br/>
          Prajete si ho vytvoriť?
        </h1>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            title_before: '',
            title_after: '',
            email: '',
            city: '',
            street: '',
            street_num: '',
            phone: '',
            dob: '',
            main_teacher: false
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
            city: Yup.string()
              .required('Povinné!'),
            street: Yup.string()
              .required('Povinné!'),
            street_num: Yup.string()
              .required('Povinné!'),
            phone: Yup.string()
              .required('Povinné!'),
            dob: Yup.string()
              .required('Povinné!'),
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
              <label htmlFor="title_before">Titul pred menom:</label>
              <Field name="title_before" type="text"/>
            </div>
            <div className="form-control">
              <label htmlFor="title_after">Titul za menom:</label>
              <Field name="title_after" type="text"/>
            </div>
            <div className="form-control">
              <label htmlFor="email">Email:</label>
              <Field name="email" type="text"/>
              <ErrorMessage name="email"/>
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
              <label htmlFor="phone">Telefónne číslo:</label>
              <Field name="phone" type="number"/>
              <ErrorMessage name="phone"/>
            </div>
            <div className="form-control">
              <label htmlFor="dob">Dátum narodenia:</label>
              <Field name="dob" type="date"/>
              <ErrorMessage name="dob"/>
            </div>
            <div className="form-control flex">
              <label htmlFor="main_teacher" className="form-check-label">Je triednym učiteľom?</label>
              <Field type="checkbox" name="main_teacher" className="check"/>
            </div>
            <button className="btn" type="submit">Vytvoriť</button>
          </Form>
        </Formik>
      </>
      }
      {(props.role === 'student' && !step) &&
      <>
        <h1>
          Tomuto študentovi doposiaľ nebol vytvorený profil.
          <br/>
          Pre vytvorenie profilu študenta je potrebne najskôr vytvoriť, alebo priradiť zákonného zástupcu.
        </h1>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            dob: '',
            phone: '',
            title_before: '',
            title_after: ''
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
            <button className="btn" type="submit">Vytvoriť</button>
          </Form>
        </Formik>
      </>
      }
      {(props.role === 'student' && step) &&
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          city: '',
          street: '',
          street_num: '',
          dob: '',
          desc: '',
          class: ''
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
                <option onClick={() => setGroupId(oneClass.groups[0].id)}
                        value={oneClass.id}>{oneClass.year}. {oneClass.classType.toUpperCase()}</option>
              ))}
            </Field>
            <ErrorMessage name="class"/>
          </div>
          <button className="btn" type="submit">Vytvoriť</button>
        </Form>
      </Formik>
      }
      {props.role === 'admin' &&
      <h1>
        Toto je admin
      </h1>}
    </>
  )
}

export default CreateProfile;