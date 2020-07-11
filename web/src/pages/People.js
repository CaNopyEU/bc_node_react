import React, {Component} from "react";

import AuthContext from "../context/auth-context";
import Spinner from '../components/Spinner/Spinner';
import BookingList from "../components/Bookings/BookingList/BookingList";
import BookingControls from "../components/Bookings/BookingControls/BookingControls";
import TeacherList from "../components/Bookings/TeacherList/TeacherList";

class PeoplePage extends Component {
  state = {
    isLoading: false,
    students: [],
    teachers: [],
    outputType: 'students'
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchPeople();
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
              parent {
                id
                first_name
                last_name
                email
                dob
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


  deleteBookingHandler = bookingId => {
    const requestBody = {
      query: `
                    mutation CancelBooking($id: ID!) {
                        cancelBooking(bookingId: $id) {
                        _id
                        title
                        }
                    }
                `,
      variables: {
        id: bookingId
      }
    };

    fetch('http://localhost:8000/api', {
        method: 'POST'
        ,
        body: JSON.stringify
        (
          requestBody
        ),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.context.token
        }
      }
    )
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== bookingId;
          });
          return {bookings: updatedBookings, isLoading: false}
        });
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
              <BookingList students={this.state.students} onDelete={this.deleteBookingHandler}/>
              :
              <BookingList students={this.state.teachers} onDelete={this.deleteBookingHandler}/>
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