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

class ClassTeacherPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      teachers: [],
      teachersNoClass: [],
      isLoading: false,
      teacher: [],
      selectedClass: null
    }
  }

  componentDidMount() {
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
  render() {
    return (
      <>
        {this.state.isLoading ? <Spinner/> :
          <table className="lectures_table">
            <thead className="table__header">
            <tr className="classes_tr">
              <td>Trieda:</td>
              <td>Ročník:</td>
              <td>Triedny učiteľ:</td>
              <td> </td>
            </tr>
            </thead>
            <tbody>
            {this.state.classes.map(classData => (
              <tr key={classData.id} className="classes_tr">
                <td>{classData.classType.toUpperCase()}</td>
                <td>{classData.year}</td>
                <td>{classData.teacher.title_before} {classData.teacher.first_name} {classData.teacher.last_name} {classData.teacher.title_after}</td>
                <td>
                  <button className="btn">Detail triedy
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        }
        </>
    )
  }

}
export default ClassTeacherPage