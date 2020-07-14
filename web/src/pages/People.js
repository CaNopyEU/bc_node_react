import React, {Component} from "react";

import AuthContext from "../context/auth-context";
import Spinner from '../components/Spinner/Spinner';
import BookingList from "../components/Bookings/BookingList/BookingList";
import BookingControls from "../components/Bookings/BookingControls/BookingControls";

class PeoplePage extends Component {
  state = {
    isLoading: false,
    students: [],
    teachers: [],
    classes: [],
    outputType: 'students'
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchPeople();
    this.fetchClasses()
  }

  fetchClasses = () => {
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

  fetchPeople = () => {
    this.setState({isLoading: true})
    let requestBody = {
      query: `
          query {
            students {
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
              classId
              groups{
                id
                title
              }
            }
          }
`
    };

    fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const students = resData.data.students;
        this.setState({students: students, isLoading: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });

    requestBody = {
      query: `
          query{
            teachers{
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

    fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const teachers = resData.data.teachers;
        this.setState({teachers: teachers, isLoading: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      });

  };

  changeOutputTypeHandler = outputType => {
    if (outputType === 'students') {
      this.setState({outputType: 'students'})
    } else {
      this.setState({outputType: 'teachers'})
    }
  }

  render() {
    console.log(this.state.classes)

    let content = <Spinner/>
    if (!this.state.isLoading) {
      content = (
        <>
          <BookingControls
            activeOutputType={this.state.outputType}
            onChange={this.changeOutputTypeHandler}
          />
          <div>
            {this.state.outputType === 'students' ?
              <BookingList students={this.state.students} user={'student'} classes={this.state.classes}/>
              :
              <BookingList students={this.state.teachers} user={'teacher'}/>
            }
          </div>
        </>
      )
    }
    return (
      <>
        {content}
      </>
    );
  }
}

export default PeoplePage;