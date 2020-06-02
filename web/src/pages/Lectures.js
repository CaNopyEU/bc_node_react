import React, {Component} from "react";

import './Auth.css';
import './lectures.css';
import AuthContext from '../context/auth-context';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Spinner from '../components/Spinner/Spinner';

class LecturePage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      lectures: [],
      isLoading: false,
      errors: '',
      success: ''
    }
  }

  componentDidMount() {
    this.fetchLectures();
  }

  fetchLectures() {
    this.setState({isLoading: true});
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
        this.setState({lectures: resData.data.lectures, isLoading: false});

      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });
  }

  submitHandler = (values) => {
    if (values.lectureType === 'true') {
      values.lectureType = true
    } else {
      values.lectureType = false
    }

    const requestBody = {
      query: `
                    mutation CreateLecture($lecture: String!, $lectureType: Boolean!) {
                        createLecture(lecture: $lecture, lectureType: $lectureType) {
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
        this.setState(prevState => {
          const updatedLectures = [...prevState.lectures];
          updatedLectures.unshift({
            id: resData.data.createLecture.id,
            lecture: resData.data.createLecture.lecture,
            lectureType: resData.data.createLecture.lectureType,
          });
          return {lectures: updatedLectures};
        })

      })
      .catch(err => {
        this.setState({errors: 'Húuups, došlo k neočakávanej chybe'})
        console.log(err);
      });
  };

  render() {
    console.log(this.state.lectures)
    return (
      <>
        <h1>Administrácia predmetov</h1>
        <Formik
          initialValues={{lecture: '', lectureType: ''}}
          validationSchema={Yup.object({
            lecture: Yup.string()
              .required('Nazov predmetu je potrebé vyplniť!')
              .min(2, 'Názov predmetu musí byť dlhší ako 3 znaky'),
            lectureType: Yup.string()
              .oneOf(
                ['true', 'false'], 'Nesprávna hodnota'
              )
              .required('req')
          })}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              this.submitHandler(values)
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="auth-form">
            {
              this.state.success &&
              <div className="form-control success">
                <label>{this.state.success}</label>
              </div>
            }
            <div className="form-control">
              <label htmlFor="lecture">Názov predmetu:</label>
              <Field name="lecture" type="text"/>
              <ErrorMessage name="lecture"/>
            </div>
            <div className="form-control">
              <label htmlFor="lecture">Typ predmetu:</label>
              <Field name="lectureType" as="select">
                <option value=""></option>
                <option value="true">Známkovaný</option>
                <option value="false">Výchovný</option>
              </Field>
              <ErrorMessage name="lectureType"/>
            </div>
            <button className="btn" type="submit">Vytvoriť predmet</button>
          </Form>
        </Formik>
        {this.state.isLoading ? <Spinner/> :
          <table>
            <thead className="table__header">
            <tr>
              <td>ID predmetu:</td>
              <td>Názov predmetu:</td>
              <td>Klasifikácia predmetu:</td>
            </tr>
            </thead>
            <tbody>
            {this.state.lectures.map(lecture => (
              <tr key={lecture.id}>
                <td>{lecture.id}</td>
                <td>{lecture.lecture}</td>
                <td>{(lecture.lectureType) ? 'Známkovaný' : 'Výchovný'}</td>
                <td><button className="btn">Edit</button></td>
              </tr>
            ))}
            </tbody>
          </table>
        }
      </>
    );
  }
}

export default LecturePage;