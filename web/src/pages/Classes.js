import React, {Component} from "react";

import './Auth.css';
import './lectures.css';
import AuthContext from '../context/auth-context';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Spinner from '../components/Spinner/Spinner';

class ClassPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      teachers: [],
      isLoading: false,
      errors: '',
      success: '',
      teacher: [],
      selectedClass: null
    }
  }

  componentDidMount() {
    this.fetchTeachers();
    this.fetchClasses();
  }

  fetchClasses() {
    this.setState({isLoading: true});
    let requestBody = {
      query: `
                    query {
                        classes {
                            id
                            classType
                            year
                            teacher {
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


  submitHandler = (values) => {
   let oneteacher = this.state.teachers.filter(teacher => teacher.id == values.teacherId).map(person => (this.setState({
     teacher: {
       first_name: person.first_name,
       last_name: person.last_name
     }
   })))
   console.log(oneteacher)

    console.log('teacher',this.state.teacher)
    console.log('teacherid', values)
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
        classType: values.classType,
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
          return {classes: updatedClasses};
        })

      })
      .catch(err => {
        this.setState({errors: 'Húuups, došlo k neočakávanej chybe'})
        console.log(err);
      });
  };
  showDetailHandler = classId => {
    this.setState(prevState => {
      const selectedClass = prevState.classes.find(e => e.id === classId);
      return {selectedClass: selectedClass};
    })
  }



  render() {
    console.log(this.state.selectedClass)
    return (
      <>
        <h1>Administrácia Tried</h1>
        <Formik
          initialValues={{classType: '', year: '', teacherId:''}}
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
                {this.state.teachers.map(teacher => (
                  <option value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
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
                <td>{classData.teacher.first_name} {classData.teacher.last_name}</td>
                <td>
                  <button onClick={this.showDetailHandler.bind(this, classData.id)} className="btn" >Edit</button>
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