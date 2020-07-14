import React, {Component} from "react";
import AuthContext from "../context/auth-context";
import MyProfileStudent from "../components/MyProfile/MyProfileStudent";
import MyProfileTeacher from "../components/MyProfile/MyProfileTeacher";

class ProfilePage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      myInfo: [],
      myParentInfo: [],
      classes: [],
      myClass: '',
      myLectures: []
    }
    //this.updateHandler = this.updateHandler.bind(this)
  }

  componentDidMount() {
    this.fetchMe();
    this.fetchClasses();
  }

  fetchClasses() {
    const requestBody = {
      query: `
                    query{
                      classes{
                        id
                        classType
                        year
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
        this.setState({classes: resData.data.classes});
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchMe() {
    let requestBody = '';
    if (this.context.role === 'teacher') {
      requestBody = {
        query: `
                    query{
                          teacherByUser(id:${this.context.userId}){
                            id
                            first_name
                            last_name
                            title_before
                            title_after
                            email
                            city
                            street
                            street_num
                            phone
                            dob
                            main_teacher
                            class{
                              id
                              classType
                              year
                            }
                            lectures{
                              id
                              lecture
                              lectureType
                            }
                            groups{
                              id
                              title 
                            }
                          }
                        }
                `
      };
    } else {
      requestBody = {
        query: `
                    query{
                          studentByUser(id:${this.context.userId}){
                            id
                            first_name
                            last_name
                            city
                            street
                            street_num
                            dob
                            desc
                            classId
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
                          }
                        }
                `
      };
    }


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
        let userInfo = [];
        let parentInfo = [];
        let classInfo = '';
        let lectureInfo = [];

        if (this.context.role === 'teacher') {
          userInfo = resData.data.teacherByUser;
          classInfo = resData.data.teacherByUser.class;
          lectureInfo = resData.data.teacherByUser.lectures;
        } else {
          userInfo = resData.data.studentByUser;
          parentInfo = resData.data.studentByUser.parent
        }
        this.setState({myInfo: userInfo, myParentInfo: parentInfo, myClass: classInfo, myLectures: lectureInfo});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.myInfo)
    return (
      <>
        <h1>Môj účet</h1>
        {this.context.role === 'student' &&
        <MyProfileStudent user={this.state.myInfo} parent={this.state.myParentInfo} classes={this.state.classes}/>}
        {this.context.role === 'teacher' &&
        <MyProfileTeacher user={this.state.myInfo} trieda={this.state.myClass} lectures={this.state.myLectures}/>}
      </>
    )
  }
}

export default ProfilePage