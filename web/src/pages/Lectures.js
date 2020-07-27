import React, {Component} from "react";

import './Auth.css';
import './lectures.css';
import AuthContext from '../context/auth-context';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Spinner from '../components/Spinner/Spinner';
import Modal from "../components/Modal/Modal";
import LectureEdit from "../components/LectureEdit/LectureEdit";
import Backdrop from "../components/Backdrop/Backdrop";

class LecturePage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      lectures: [],
      isLoading: false,
      errors: '',
      success: '',
      selectedLecture: ''
    }
    this.updateHandler = this.updateHandler.bind(this)
  }

  updateHandler(id, lecture, type) {
    this.setState({
      selectedLecture: {
        lecture: lecture,
        lectureType: type
      }
    });
    const elIndex = this.state.lectures.findIndex(lecture => lecture.id === id);
    let newLectures = [...this.state.lectures];
    newLectures[elIndex] = {
      ...newLectures[elIndex],
      lecture: lecture,
      lectureType: type
    }
    this.setState({
      lectures: newLectures
    })
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

  showDetailHandler = id => {
    this.setState(prevState => {
      const selectedLecture = prevState.lectures.find(e => e.id === id);
      return {selectedLecture: selectedLecture};
    })
  }

  deleteLectureHandler = id => {
    const newLectures = this.state.lectures.filter(lecture => lecture.id !== id);
    this.setState({
      lectures: newLectures
    })
  }
  deleteLectures(id) {
    const requestBody = {
      query: `
                    mutation{
                      deleteLecture(id: ${id}){
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
        this.deleteLectureHandler(id)
      })
      .catch(err => {
        console.log(err);
      });
  }
  confirmDelete = (id, lecture) => {
    let r = window.confirm(`Prajete si predmet "${lecture}" odstaniť?`);
    if (r === true) {
      this.deleteLectures(id)
    }
  }
  modalCancelHandler = () => {
    this.setState({creating: false, selectedLecture: null});
  };

  render() {
    return (
      <>
        {(this.state.selectedLecture) && <Backdrop/>}
        {this.state.selectedLecture && (
          <Modal
            title={`Úprava predmetu ${this.state.selectedLecture.lecture}`}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <LectureEdit updateHandler={this.updateHandler} lecture={this.state.selectedLecture} cancel={this.modalCancelHandler}/>
          </Modal>)}
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
                <option value="">--Vyberte--</option>
                <option value="true">Známkovaný</option>
                <option value="false">Výchovný</option>
              </Field>
            </div>
            <button className="btn" type="submit">Vytvoriť predmet</button>
          </Form>
        </Formik>
        {this.state.isLoading ? <Spinner/> :
          <table className="lectures_table">
            <thead className="table__header">
            <tr>
              <td>ID predmetu:</td>
              <td>Názov predmetu:</td>
              <td>Klasifikácia predmetu:</td>
              <td>Nastavenia</td>
            </tr>
            </thead>
            <tbody>
            {this.state.lectures.map(lecture => (
              <tr key={lecture.id}>
                <td>{lecture.id}</td>
                <td>{lecture.lecture}</td>
                <td>{(lecture.lectureType) ? 'Známkovaný' : 'Výchovný'}</td>
                <td>
                  <button onClick={this.showDetailHandler.bind(this, lecture.id)} className="btn">Upraviť</button>
                  <button onClick={this.confirmDelete.bind(this, lecture.id, lecture.lecture)} className="btn red">Odstrániť</button>
                </td>
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