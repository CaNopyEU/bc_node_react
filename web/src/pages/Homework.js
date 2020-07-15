import React, {Component} from "react";

import './Auth.css';
import './lectures.css';
import AuthContext from '../context/auth-context';
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";

class HomeworkPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      homeworks: [],
      selectedHomework: '',
    }
  }

  componentDidMount() {
    this.fetchHomeworks()
  }

  fetchHomeworks() {
    let requestBody = {
      query: `
                    query{
                      homeworksByStudent(studentId: ${this.context.myId}){
                        id
                          name
                          desc
                          deadline
                          lecture{
                            lecture
                          }
                          teacher{
                            first_name
                            last_name
                            title_before
                            title_after
                          }
                          group{
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
        this.setState({homeworks: resData.data.homeworksByStudent})
      })
      .catch(err => {
        console.log(err);
      });
  }

  modalCancelHandler = () => {
    this.setState({selectedHomework: null});
  };

  render() {
    return (
      <>
        {(this.state.selectedHomework) && <Backdrop/>}
        {this.state.selectedHomework && (
          <Modal
            title={this.state.selectedHomework.name}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <h1>{this.state.selectedHomework.desc}</h1>
            <h3>{`Dátum odovzdania domácej úlohy : ${new Date(this.state.selectedHomework.deadline).toLocaleDateString()}`}</h3>
            <h3>{`Zadávateľ domácej úlohy : ${this.state.selectedHomework.teacher.title_before} ${this.state.selectedHomework.teacher.first_name} ${this.state.selectedHomework.teacher.last_name} ${this.state.selectedHomework.teacher.title_after}`}</h3>
            <h3>{`Domáca úloha z predmetu : ${this.state.selectedHomework.lecture.lecture}`}</h3>
          </Modal>)}
        <h1>Domáce úlohy</h1>
        {this.state.homeworks.map(hw => (
          <div className="homework-item">
            <div className="hw-item-left">
              <div className="is-row">
                <h2>Názov predmetu: </h2>
                <h2 className="black">{hw.lecture.lecture}</h2>
              </div>
              <div className="is-row">
                <h2>Zadávateľ domácej úlohy: </h2>
                <h2
                  className="black">{hw.teacher.title_before} {hw.teacher.first_name} {hw.teacher.last_name} {hw.teacher.title_after}</h2>
              </div>
              <div className="is-row">
                <h2>Názov domácej úlohy: </h2>
                <h2 className="black">{hw.name}</h2>
              </div>
              <div className="is-row">
                <h2>Dátum odovzdania: </h2>
                <h2 className="black">{new Date(hw.deadline).toLocaleDateString()}</h2>
              </div>
            </div>
            <button onClick={() => this.setState({selectedHomework: hw})} className="homework-btn">Zobraziť Detail
            </button>
          </div>
        ))}
      </>
    )
  }
}

export default HomeworkPage