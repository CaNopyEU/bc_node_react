import React, {Component} from "react";

import './Auth.css';
import './lectures.css';
import AuthContext from '../context/auth-context';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Spinner from '../components/Spinner/Spinner';
import Backdrop from '../components/Backdrop/Backdrop'
import Modal from '../components/Modal/Modal'
import Group from '../components/Groups/Group'
import ClassTeacherUpdate from "../components/Groups/ClassTeacherUpdate";
import LectureEdit from "../components/LectureEdit/LectureEdit";

class ClassPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      teachers: [],
      teachersNoClass: [],
      isLoading: false,
      errors: '',
      success: '',
      teacher: [],
      selectedClass: null
    }
    this.createGroup = this.createGroup.bind(this);
    this.updateHandler = this.updateHandler.bind(this)
  }

  componentDidMount() {
    this.fetchTeachers();
    this.fetchNoClassTeachers();
    this.fetchClasses();
  }


  fetchClasses() {
    this.setState({isLoading: true});
    let requestBody = {
      query: `
                    query{
                      classes{
                        id
                        classType
                        year
                        teacher{
                          id
                          title_before
                          title_after
                          first_name
                          last_name
                        }
                        groups{
                          id
                          title
                        }
                        students{
                          id
                          first_name
                          last_name
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
        this.setState({classes: resData.data.classes, isLoading: false});

      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });
  }

  fetchTeachers() {
    this.setState({isLoading: true});
    let requestBody = {
      query: `
                    query {
                        teachers {
                            id
                            first_name
                            last_name
                            title_before
                            title_after
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
        this.setState({teachers: resData.data.teachers, isLoading: false});

      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });
  }

  fetchNoClassTeachers() {
    this.setState({isLoading: true});
    let requestBody = {
      query: `
                    query {
                        teachersWith {
                            id
                            first_name
                            last_name
                            title_before
                            title_after
                            class {
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
        const woClass = resData.data.teachersWith.filter(teacher => teacher.class === null);
        this.setState({teachersNoClass: woClass, isLoading: false});

      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });
  }

  createGroup = (value) => {
    const requestBody = {
      query: `
                    mutation CreateGroup($classId: Int!) {
                        createGroup(title: 1, classId: $classId) {
                            id
                            title
                        }
                    }
                `,
      variables: {
        classId: value
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
      .catch(err => {
        this.setState({errors: 'Húuups, došlo k neočakávanej chybe'})
        console.log(err);
      });

  };

  submitHandler = (values) => {
    this.state.teachers.filter(teacher => teacher.id == values.teacherId).map(person => (this.setState({
      teacher: {
        first_name: person.first_name,
        last_name: person.last_name
      }
    })));

    const requestBody = {
      query: `
                    mutation CreateClass($classType: String!, $year: Int!, $teacherId: Int!) {
                        createClass(classType: $classType, year: $year, teacherId: $teacherId) {
                            id
                            classType
                            year
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
        if (resData.data.createClass) {
          this.setState(prevState => {
            const updatedClasses = [...prevState.classes];
            updatedClasses.unshift({
              id: resData.data.createClass.id,
              classType: resData.data.createClass.classType,
              year: resData.data.createClass.year,
              teacher: {
                first_name: this.state.teacher.first_name,
                last_name: this.state.teacher.last_name
              }
            });
            this.createGroup(resData.data.createClass.id)
            this.setState({
              success: 'Vytvorenie triedy prebehlo úspešne.'
            })
            return {classes: updatedClasses};
          })
        } else {
          this.setState({
            errors: 'Triedu sa nepodatilo vytvoriť.'
          })
        }
      })
      .catch(err => {
        this.setState({errors: 'Húuups, došlo k neočakávanej chybe'})
        console.log(err);
      });
  };

  updateHandler(id, oneClass) {
    this.setState({
      selectedClass: {
        id: oneClass.id,
        classType: oneClass.classType,
        year: oneClass.year,
        teacher: {
          id: oneClass.teacher.id,
          first_name: oneClass.teacher.first_name,
          last_name: oneClass.teacher.last_name,
          title_before: oneClass.teacher.title_before,
          title_after: oneClass.teacher.title_after
        }
      }
    });
    const elIndex = this.state.classes.findIndex(oClass => oClass.id === id);
    let newClasses = [...this.state.classes];
    newClasses[elIndex] = {
      ...newClasses[elIndex],
      classType: oneClass.classType,
      year: oneClass.year,
      teacher: {
        id: oneClass.teacher.id,
        first_name: oneClass.teacher.first_name,
        last_name: oneClass.teacher.last_name,
        title_before: oneClass.teacher.title_before,
        title_after: oneClass.teacher.title_after
      }
    };
    this.setState({
      classes: newClasses
    })
  }

  showDetailHandler = classId => {
    this.setState(prevState => {
      const selectedClass = prevState.classes.find(e => e.id === classId);
      return {selectedClass: selectedClass};
    })
  }

  modalCancelHandler = () => {
    this.setState({creating: false, selectedClass: null});
  };

  render() {
    console.log('selected class', this.state.selectedClass)
    console.log('lectures: ', this.state.lectures)
    return (
      <>
        {(this.state.creating || this.state.selectedClass) && <Backdrop/>}
        {this.state.selectedClass && (
          <Modal
            title={`Trieda ${this.state.selectedClass.year}. ${this.state.selectedClass.classType.toUpperCase()}`}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <ClassTeacherUpdate id={this.state.selectedClass.id}
                                updateHandler={this.updateHandler}
                                thisClass={this.state.selectedClass}
                                teachers={this.state.teachersNoClass}/>
            <hr/>
            <Group classId={this.state.selectedClass.id}
                   class={this.state.selectedClass}
                   teachers={this.state.teachers}/>
          </Modal>)}
        <h1>Administrácia Tried</h1>
        <Formik
          initialValues={{classType: '', year: '', teacherId: ''}}
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
              this.submitHandler(values)
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="auth-form">
            {
              this.state.errors &&
              <div className="form-control errors">
                <label>{this.state.errors}</label>
              </div>
            }
            {
              this.state.success &&
              <div className="form-control success">
                <label>{this.state.success}</label>
              </div>
            }
            <div className="form-control">
              <label htmlFor="classType">Trieda:</label>
              <Field name="classType" type="text"/>
              <ErrorMessage name="classType"/>
            </div>
            <div className="form-control">
              <label htmlFor="year">Ročník:</label>
              <Field name="year" type="number"/>
              <ErrorMessage name="year"/>
            </div>
            <div className="form-control">
              <label htmlFor="teacherId">Výber učiteľa:</label>
              <Field name="teacherId" as="select">
                <option value="">--Vyberte--</option>
                {this.state.teachersNoClass.map(teacher => (
                  <option
                    value={teacher.id}>{teacher.title_before} {teacher.first_name} {teacher.last_name} {teacher.title_after}</option>
                ))}
              </Field>
              <ErrorMessage name="lectureType"/>
            </div>
            <button className="btn" type="submit">Vytvoriť triedu</button>
          </Form>
        </Formik>
        {this.state.isLoading ? <Spinner/> :
          <table>
            <thead className="table__header">
            <tr>
              <td>Trieda:</td>
              <td>Ročník:</td>
              <td>Triedny učiteľ:</td>
            </tr>
            </thead>
            <tbody>
            {this.state.classes.map(classData => (
              <tr key={classData.id}>
                <td>{classData.classType.toUpperCase()}</td>
                <td>{classData.year}</td>
                <td>{classData.teacher.title_before} {classData.teacher.first_name} {classData.teacher.last_name} {classData.teacher.title_after}</td>
                <td>
                  <button onClick={this.showDetailHandler.bind(this, classData.id)} className="btn">Detail triedy
                  </button>
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

export default ClassPage;