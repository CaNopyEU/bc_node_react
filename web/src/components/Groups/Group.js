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
      groupLectures: [],
      selectedLecture: ''
    };
    this.createGroup = this.createGroup.bind(this);
    this.addLectureToGroup = this.addLectureToGroup.bind(this);
  }

  fetchGroups() {
    let requestBody = {
      query: `
                    query {
                        groupsByClass(classId: ${this.props.class.id}) {
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
    console.log('maheeeeeeee', e)
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
      this.lectureToGroup(selectedGroup.id)
      return {selectedGroup: selectedGroup};
    })
  }

  createGroup = () => {
    let title = this.state.groups.length + 1
    const requestBody = {
      query: `
                    mutation CreateGroup($title: Int! $classId: Int!) {
                        createGroup(title: $title, classId: $classId) {
                            id
                            title
                        }
                    }
                `,
      variables: {
        classId: this.props.class.id,
        title: title
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
        if (resData.data.createGroup) {
          this.setState(prevState => {
            const updatedGroups = [...prevState.groups];
            updatedGroups.push({
              id: resData.data.createGroup.id,
              title: resData.data.createGroup.title
            });
            return {groups: updatedGroups};
          })
        }
      })
      .catch(err => {
        this.setState({errors: 'Húuups, došlo k neočakávanej chybe'})
        console.log(err);
      });

  }

  addLectureToGroup = (values) => {
    console.log('predmet id', values.lecture);
    console.log('groupd id', this.state.selectedGroup.id)

    const requestBody = {
      query: `
                    mutation CreateGroupLecture($lectureId: Int! $groupId: Int!) {
                        createGroupLecture(lectureId: $lectureId, groupId: $groupId) {
                             groups{
                              id
                            }
                            lectures{
                              id
                              lecture
                              lectureType
                            }
                        }
                    }
                `,
      variables: {
        lectureId: parseInt(values.lecture, 10),
        groupId: this.state.selectedGroup.id
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
        if (resData.data.createGroupLecture) {
          this.setState(prevState => {
            const updatedGroupLectures = [...prevState.groupLectures];
            updatedGroupLectures.push({
              id: resData.data.createGroupLecture.lectures.id,
              lecture: resData.data.createGroupLecture.lectures.lecture,
              lectureType: resData.data.createGroupLecture.lectures.lectureType,
            });
            this.setState({
              success: 'Vytvorenie triedy prebehlo úspešne.'
            })
            return {groupLectures: updatedGroupLectures};
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

  }

  componentDidMount() {
    this.fetchGroups();
    this.fetchLectures();
  }

  render() {
    console.log('selected group', this.state.selectedGroup)
    console.log('lectures', this.state.lectures)
    console.log('lectures from group', this.state.groupLectures)
    console.log('selected class', this.props.class)

    const header = (
      <>
        {this.state.groups.map((group) => <button className="btn"
                                                  onClick={this.showDetailHandler.bind(this, group.id)}>
          {group.title}
        </button>)
        }
        <button onClick={this.createGroup} className="btn" style={{backgroundColor: 'green'}}>+</button>
        <button className="btn" style={{backgroundColor: 'red'}}>-</button>
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
            <div className="groups-body-group">
              {
                this.state.selectedGroup.title === 1 ?
                  <h2>Spoločné predmety:</h2>
                  :
                  <h2>Predmety:</h2>
              }
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
                    this.addLectureToGroup(values)
                    setSubmitting(false);
                  }, 400);
                }}
              >
                <Form>
                  <div className="groups-form-control">
                    <Field name="lecture" as="select">
                      <option value="">--Vyberte--</option>
                      {this.state.lectures.map((lecture) => <option
                        value={lecture.id}>{lecture.lecture}({(lecture.lectureType) ? 'Známkovaný' : 'Výchovný'})</option>)}
                    </Field>
                    <ErrorMessage name="lecture"/>
                    <button className="plus-button" type="submit"> Pridať predmet</button>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="groups-body-students">
              <h2>Študenti:</h2>
              {this.state.selectedGroup.title === 1 ?
                <>
                {this.props.class.students.map((student) => <div
                className="groups-form-control">{student.first_name} {student.last_name}</div>)}
                </>
              :
                <Formik
                  initialValues={{student: ''}}
                  validationSchema={Yup.object({
                    student: Yup.string()
                      .required('Študenta je potrebné vybrať')
                  })}
                  onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values))
                      //this.addLectureToGroup(values)
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  <Form>
                    <div className="groups-form-control">
                      <Field name="student" as="select">
                        <option value="">--Vyberte--</option>
                        {this.props.class.students.map((student) => <option
                          value={student.id}>{student.first_name} {student.last_name}</option>)}
                      </Field>
                      <ErrorMessage name="student"/>
                      <button className="plus-button" type="submit"> Pridať študenta</button>
                    </div>
                  </Form>
                </Formik>
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Group