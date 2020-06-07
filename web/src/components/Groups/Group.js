import React, {Component} from 'react';

import './Group.css'
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

class Group extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      selectedGroup: '',
      lectures: [],
      groupLectures: []
    }
  }

  fetchGroups() {
    let requestBody = {
      query: `
                    query {
                        groupsByClass(classId: ${this.props.classId}) {
                            id
                            title
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
        this.setState({
          groups: resData.data.groupsByClass,
          selectedGroup: resData.data.groupsByClass[0]
        });
        this.lectureToGroup(this.state.selectedGroup.id)
      })
      .catch(err => {
        console.log(err);
      });
  }

  lectureToGroup(e) {
    console.log('maheeeeeeee',e)
    let requestBody = {
      query: `
                    query {
                        group(id: ${e}) {
                            id
                            title
                            lectures{
                              id
                              lecture
                              lectureType
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
        this.setState({
          groupLectures: resData.data.group.lectures
        })
      })
      .catch(err => {
        console.log(err);
      });

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
        this.setState({lectures: resData.data.lectures});

      })
      .catch(err => {
        console.log(err);
      });
  }

  showDetailHandler = groupId => {
    this.setState(prevState => {
      const selectedGroup = prevState.groups.find(e => e.id === groupId);
      return {selectedGroup: selectedGroup};
    })
  }

  componentDidMount() {
    this.fetchGroups();
    this.fetchLectures();
  }

  render() {
    console.log('selected group', this.state.selectedGroup)
    console.log('lectures', this.state.lectures)
    console.log('lectures from group', this.state.groupLectures)

    const header = (
      <>
        {this.state.groups.map((group) => <button className="btn"
                                                  onClick={this.showDetailHandler.bind(this, group.id)}>
          {group.title}
        </button>)
        }
      </>
    )
    return (
      <>
        <div className="groups">
          <div className="groups-header">
            {
              header
            }
          </div>
          <div className="groups-body">
            {this.state.groupLectures.map((lecture) => <div
              className="groups-form-control">{lecture.lecture}({(lecture.lectureType) ? 'Známkovaný' : 'Výchovný'})</div>)}

            <Formik
              initialValues={{lecture: ''}}
              validationSchema={Yup.object({
                lecture: Yup.string()
                  .required('Predmet je potrebné vybrať')
              })}
              onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                  this.submitHandler(values)
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form>
                <div className="groups-form-control">
                  <Field name="role" as="select">
                    <option value=""></option>
                    {this.state.lectures.map((lecture) => <option
                      value={lecture.id}>{lecture.lecture}({(lecture.lectureType) ? 'Známkovaný' : 'Výchovný'})</option>)}
                  </Field>
                  <ErrorMessage name="role"/>
                  <button className="plus-button" type="submit"> Pridať predmet</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>

      </>
    )
  }
}

export default Group