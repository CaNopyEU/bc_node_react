import React, {useState} from 'react';

import ProfileStudentView from "./ProfileStudentView";
import ProfileStudentEdit from "./ProfileStudentEdit";
import ProfileParentEdit from "./ProfileParentEdit";
import ProfileParentView from "./ProfileParentView";

function ProfileStudent(props) {

  const [editStudent, setEditStudent] = useState(false);
  const [editParent, setEditParent] = useState(false);

  function editStudentHandler() {
    setEditStudent(!editStudent);
  }
  function editParentHandler() {
    setEditParent(!editParent);
  }

  return (
    <div className="in-row">
      <div className="in-column">
        {
          editStudent ?
            <ProfileStudentEdit user={props.user} editHandler={editStudentHandler} classes={props.classes} update={props.update}/>
            :
            <ProfileStudentView user={props.user} editHandler={editStudentHandler}/>
        }
      </div>
      <div className="in-column">
        {
          editParent ?
            <ProfileParentEdit user={props.user.parent} editHandler={editParentHandler}  update={props.update}/>
            :
            <ProfileParentView parent={props.user.parent} editHandler={editParentHandler}/>
        }
      </div>
    </div>
  )
}

export default ProfileStudent;