import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import decoded from 'jwt-decode';

import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import UsersPage from "./pages/Users";
import PeoplePage from "./pages/People";
import RegistrationPage from "./pages/Registration";
import LecturePage from "./pages/Lectures";
import ClassPage from "./pages/Classes";
import ProfilePage from "./pages/Profile";
import ClassTeacherPage from "./pages/ClassesTeacher";
import AttendancePage from "./pages/Attendance";
import RecordPage from "./pages/Record";
import HomeworkPage from "./pages/Homework";
import GradeBookPage from "./pages/GradeBook";

import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
    myId: null,
    role: null,
    mTeacher: null,
  }
  currentUser = () => {
    const user = JSON.parse(localStorage.getItem('token'));
    if (user) {
      console.log(decoded(user))
    }
  }
  login = (token, userId, tokenExpiration, role, myId, mTeacher) => {
    this.setState({token: token, userId: userId, role: role, myId: myId, mTeacher: mTeacher});
    localStorage.setItem('token', JSON.stringify(token));
  }

  logout = () => {
    this.setState({token: null, userId: null, role: null, myId: null, mTeacher: null});
    localStorage.removeItem('token');
  };

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const dtoken = decoded(token);
      this.setState({
        token: token,
        userId: dtoken.userId,
        role: dtoken.role,
        myId: dtoken.myId,
        mTeacher: dtoken.mTeacher
      })
    }
    ;
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            myId: this.state.myId,
            role: this.state.role,
            mTeacher: this.state.mTeacher,
            login: this.login,
            logout: this.logout,
            currentUser: this.currentUser
          }}>
          <MainNavigation/>
          <main className="main-content">
            <Switch>
              {!this.state.token && <Redirect from="/" to="/auth" exact/>}
              {!this.state.token && <Redirect from="/users" to="/" exact/>}
              {!this.state.token && <Redirect from="/people" to="/" exact/>}
              {!this.state.token && <Redirect from="/class" to="/" exact/>}
              {!this.state.token && <Redirect from="/registration" to="/" exact/>}
              {!this.state.token && <Redirect from="/events" to="/" exact/>}
              {!this.state.token && <Redirect from="/lectures" to="/" exact/>}
              {!this.state.token && <Redirect from="/profile" to="/" exact/>}
              {!this.state.token && <Redirect from="/lectures" to="/" exact/>}
              {!this.state.token && <Redirect from="/myclass" to="/" exact/>}
              {!this.state.token && <Redirect from="/attendance" to="/" exact/>}
              {!this.state.token && <Redirect from="/record" to="/" exact/>}
              {!this.state.token && <Redirect from="/homework" to="/" exact/>}
              {!this.state.token && <Redirect from="/grades" to="/" exact/>}
              {this.state.token  && <Redirect from="/auth" to="/people" exact/>}

              {!this.state.token && (
                <Route path="/auth" component={AuthPage}/>
              )}
              {this.state.token && (
                <>
                  <Route path="/profile" component={ProfilePage}/>
                  <Route path="/people" component={PeoplePage}/>
                  <Route path="/class" component={ClassPage}/>
                  <Route path="/registration" component={RegistrationPage}/>
                  <Route path="/events" component={EventsPage}/>
                  <Route path="/users" component={UsersPage}/>
                  <Route path="/lectures" component={LecturePage}/>
                  <Route path="/myclass" component={ClassTeacherPage}/>
                  <Route path="/attendance" component={AttendancePage}/>
                  <Route path="/record" component={RecordPage}/>
                  <Route path="/homework" component={HomeworkPage} />
                  <Route path="/grades" component={GradeBookPage} />
                </>
              )}
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
