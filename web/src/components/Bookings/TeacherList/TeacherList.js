import React from "react";

import './TeacherList.css';

const teacherList = props => (
  <ul className="bookings__list">
    {props.teachers.map(teacher => {
      return (
        <li key={teacher._id} className="bookings__item">
          <div className="bookings__item-data">
            {teacher.first_name} - {' '}
            {new Date(teacher.createdAt).toLocaleDateString()}
          </div>
          <div className="bookings_item-actions">
            <button className="btn" onClick={props.onDelete.bind(this, teacher.id)}>Cancel</button>
          </div>
        </li>
      )
    })}
  </ul>
);

export default teacherList;