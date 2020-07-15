import React, {Component} from "react";

import './Auth.css';
import './lectures.css';
import AuthContext from '../context/auth-context';

class AttendancePage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      attendances: []
    }
  }

  componentDidMount() {
    this.fetchAttendance()
  }

  fetchAttendance() {
    let requestBody = {
      query: `
                    query{
                      attendancesByStudent(studentId:${this.context.myId}){
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
        this.setState({attendances: resData.data.attendancesByStudent})
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
      <>
        <h1>Moje neprítomnosti</h1>
        {this.state.attendances.map(atte => (
          <div className={atte.pardon ? 'attendance-block-success':'attendance-block-error'}>
            <h2>{new Date(atte.date).toLocaleDateString()}</h2>
            <h2>{atte.desc}</h2>
            <h2>{atte.pardon ? 'Nasledujúca neprítomnosť bola ospravedlnená': 'Nasledujúca neprítomnosť zatiaľ nebola ospravedlnená'}</h2>
            </div>
        ))}
      </>
    )
  }
}

export default AttendancePage