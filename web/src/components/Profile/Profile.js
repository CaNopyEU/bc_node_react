import React, {useState} from 'react';
import ProfileStudent from "./ProfileStudent/ProfileStudent";
import ProfileTeacher from "./ProfileTeacher/ProfileTeacher";

function Profile(props) {

  if (props.role === 'student') {
    return <ProfileStudent user={props.user} update={props.handleUpdate} classes={props.classes}/>
  } else if (props.role === 'teacher') {
    return <ProfileTeacher user={props.user} update={props.handleUpdate}/>
  } else if (props.role === 'admin') {
    return <h1>Admina nieje možné editovať</h1>
  }
}

export default Profile;