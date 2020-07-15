import React, {Component} from "react";

import './Auth.css';
import './lectures.css';
import AuthContext from '../context/auth-context';

class RecordPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      records: []
    }
  }

  componentDidMount() {
    this.fetchRecords()
  }

  fetchRecords() {
    let requestBody = {
      query: `
                    query{
                        recordsByStudent(studentId:${this.context.myId}){
                          id
                          desc
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
        this.setState({records: resData.data.recordsByStudent})
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <h1>Moje poznámky</h1>
        {this.state.records.map(rec => (
          <div className="record center">
            <h2>{rec.desc}</h2>
            <h2>{new Date(rec.date).toLocaleDateString()}</h2>
          </div>
        ))}

      </>

    )
  }
}

export default RecordPage