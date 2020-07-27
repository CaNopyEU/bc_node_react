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
import Attendance from "../components/Attendance/Attendance";
import Record from "../components/Record/Record";
import ProfileStudentView from "../components/Profile/ProfileStudent/ProfileStudentView";
import ProfileParentView from "../components/Profile/ProfileStudent/ProfileParentView";

class ClassTeacherPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      myClass: '',
      thisClass: '',
      isLoading: false,
      selectedStudent: null,
      attendances: [],
      records: [],
    }
    this.handleCreateAttendace = this.handleCreateAttendace.bind(this);
    this.handleCreateRecord = this.handleCreateRecord.bind(this);
    this.handleActivateAttendance = this.handleActivateAttendance.bind(this);
    this.handleRemoveAttendance = this.handleRemoveAttendance.bind(this);
    this.handleRemoveRecord = this.handleRemoveRecord.bind(this);
  }

  componentDidMount() {
    this.fetchMe()
  }

  fetchMe() {
    this.setState({isLoading: true});
    let requestBody = {
      query: `
                    query{
                      teacher(id:${this.context.myId}){
                        id
                        first_name
                        last_name
                        class{
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
        this.setState({myClass: resData.data.teacher.class.id});
        this.fetchClass()
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });
  }

  fetchStudent(id) {
    let requestBody = {
      query: `
                    query{
                      student(id:${id}){
                          id
                          first_name
                          last_name
                          city
                          street
                          street_num
                          dob
                          desc
                          parent{
                            id
                            first_name
                            last_name
                            email
                            dob
                            phone
                            title_before
                            title_after
                          }
                          attendances{
                            id
                            desc
                            date
                            pardon
                          }
                          records{
                            id
                            desc
                            date
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
        this.setState({selectedStudent: resData.data.student});
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleActivateAttendance(id){
    let requestBody = {
      query: `
                    mutation{
                      activateAttendance(id:${id}){
                        id
                        desc
                        date
                        pardon
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
        this.fetchStudent(this.state.selectedStudent.id)
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleRemoveAttendance(id){

    const r = window.confirm('Naozaj si prajete danú neprítomnosť odstrániť ?')
    if(r !== true){
      return
    }
    let requestBody = {
      query: `
                    mutation{
                      deleteAttendance(id:${id}){
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
        this.fetchStudent(this.state.selectedStudent.id)
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleRemoveRecord(id){
    const r = window.confirm('Naozaj si prajete danú poznámku odstrániť ?')
    if(r !== true){
      return
    }
    let requestBody = {
      query: `
                    mutation{
                      deleteRecord(id:${id}){
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
        this.fetchStudent(this.state.selectedStudent.id)
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCreateAttendace(values){
    if (values.pardon === 'true') {
      values.pardon = true
    } else {
      values.pardon = false
    }
    let requestBody = {
      query: `
                    mutation CreateAttendance($desc: String!, $date: String!, $pardon: Boolean!){
                      createAttendance(teacherId:${this.context.myId},studentId:${this.state.selectedStudent.id}, desc: $desc, date: $date, pardon: $pardon)
                      {
                        id
                        desc
                        date
                        pardon
                        teacher{
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
        desc: values.desc,
        date: values.date,
        pardon: values.pardon
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
        this.fetchStudent(this.state.selectedStudent.id)
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCreateRecord(values){

    let requestBody = {
      query: `
                    mutation CreateRecord($desc: String!, $date: String!){
                      createRecord(teacherId:${this.context.myId},studentId:${this.state.selectedStudent.id}, desc: $desc, date: $date)
                      {
                        id
                      }
                    }
                `,
      variables: {
        desc: values.desc,
        date: values.date,
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
        this.fetchStudent(this.state.selectedStudent.id)
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchClass() {
    this.setState({isLoading: true});
    let requestBody = {
      query: `
                    query{
                      oneClass(id:${this.state.myClass}){
                        id
                        classType
                        year
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
        this.setState({thisClass: resData.data.oneClass, isLoading: false});

      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });
  }

  modalCancelHandler = () => {
    this.setState({selectedStudent: null});
  };

  render() {

    console.log(this.state.thisClass)

    return (
      <>
        {(this.state.selectedStudent) && <Backdrop/>}
        {this.state.selectedStudent && (
          <Modal
            title={`Detail študenta ${this.state.selectedStudent.first_name} ${this.state.selectedStudent.last_name}`}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <div className="in-row">
              <div className="in-column-profile-student-class">
                <ProfileStudentView user={this.state.selectedStudent} onlyView/>
              </div>
              <div className="in-column-profile-student-class">
                <ProfileParentView parent={this.state.selectedStudent.parent} onlyView/>
              </div>
            </div>
            <div className="in-row">
              <div className="in-column-profile-student-class">
                <Attendance remove={this.handleRemoveAttendance} activate={this.handleActivateAttendance} save={this.handleCreateAttendace} data={this.state.selectedStudent.attendances} />
              </div>
              <div className="in-column-profile-student-class">
                <Record remove={this.handleRemoveRecord} save={this.handleCreateRecord} data={this.state.selectedStudent.records}/>
              </div>
            </div>
            {/*<LectureEdit updateHandler={this.updateHandler} lecture={this.state.selectedLecture} cancel={this.modalCancelHandler}/>*/}
          </Modal>)}
        {this.state.isLoading ? <Spinner/> :
          <table className="lectures_table">
            <thead className="table__header">
            <tr className="classes_tr">
              <td>Meno:</td>
              <td>Priezvisko:</td>
              <td>Detail:</td>
            </tr>
            </thead>
            <tbody>
            {
              this.state.thisClass.students &&
              this.state.thisClass.students.map(student => (
                <tr key={student.id} className="classes_tr">
                  <td>{student.first_name.toUpperCase()}</td>
                  <td>{student.last_name.toUpperCase()}</td>
                  <td>
                    <button onClick={() => this.fetchStudent(student.id)} className="btn">Detail žiaka
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