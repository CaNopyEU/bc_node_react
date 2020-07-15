import React, {Component} from "react";

import './Auth.css';
import './lectures.css';
import AuthContext from '../context/auth-context';

class GradeBookPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      lectures: [],
      selectedLecture: '',
      grades: [],
    }
  }

  componentDidMount() {
    this.fetchMyLectures()
  }

  fetchMyLecGrades(id) {
    let requestBody = {
      query: `
                query{
                  gradesByStudLec(studentId: ${this.context.myId},lectureId:${id}) {
                    id
                    grade
                    date
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
        this.setState({grades: resData.data.gradesByStudLec})
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchMyLectures() {
    let requestBody = {
      query: `
                   query{
                      lecturesByStudent(studentId: ${this.context.myId}){
                        id
                        lecture
                        lectureType
                        groups{
                          id
                          students{
                            id
                          }
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
        this.setState({lectures: resData.data.lecturesByStudent})
      })
      .catch(err => {
        console.log(err);
      });
  }

  getFilteredDates(min, max) {
    const shit = this.state.grades.filter(x => (x.date > min) && (x.date < max));
    return Object.values(shit);
  }

  handleClickLecture(value) {
    this.setState({selectedLecture: value})
    this.fetchMyLecGrades(value.id)
  }

  render() {


    const min = Date.parse('2020-04-01');
    const max = Date.parse('2020-11-30');

    console.log(min)
    return (
      <>
        <h1>Moja žiacka knižka</h1>
        <div className="gradebook-btns">
        {
          this.state.lectures.map(lec => (
            <button onClick={() => this.handleClickLecture(lec)} className="btn">{lec.lecture}</button>
          ))
        }
        </div>
        {
          this.state.selectedLecture &&
          <div className="gradebook-platform">
            <h1 className="gradebook-platform-lecture">{this.state.selectedLecture.lecture}</h1>
            <table className="table-grades">
              <tr><td>September</td><td>Október</td><td>November</td><td>December</td><td>Január</td><td>Február</td><td>Marec</td><td>Apríl</td><td>Máj</td><td>Jún</td></tr>
              <tr><td>{this.getFilteredDates(min, max)}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            </table>
          </div>

        }

      </>
    )
  }
}

export default GradeBookPage