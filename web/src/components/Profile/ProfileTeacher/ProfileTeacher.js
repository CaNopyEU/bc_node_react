import React, {useState} from 'react';
import ProfileTeacherLecture from "./ProfileTeacherLecture";
import '../Profile.css';
import ProfileTeacherView from "./ProfileTeacherView";
import ProfileTeacherEdit from "./ProfileTeacherEdit";

function ProfileTeacher(props) {
  const [editing, setEditing] = useState(false);

  function editTeacherHandler() {
    setEditing(!editing);
  }
  return (
    <div className="in-row">
      <div>
      {editing  ? <ProfileTeacherEdit user={props.user} editHandler={editTeacherHandler} update={props.update}/>  : <ProfileTeacherView user={props.user} editHandler={editTeacherHandler}/>}
      </div>
      <ProfileTeacherLecture lectures={props.user.lectures} id={props.user.id}/>
    </div>
  )
}

export default ProfileTeacher;