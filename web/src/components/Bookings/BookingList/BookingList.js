import React, {useState} from "react";

import '../TeacherList/TeacherList.css';

function bookingList(props) {
  return (
    <ul className="bookings__list">
      {props.students.map(student => {
        return (
          <li key={student.id} className="bookings__item">
            <div className="bookings__item-data">
              {props.user === 'teacher' &&
              <>
                <p>{student.title_before} {student.first_name} {student.last_name} {student.title_after}</p>
                {student.class &&
                <p>{student.class.year}. {student.class.classType}</p>

                }
              </>
              }
              {props.user === 'student' &&
              <>
                <p>{student.title_before} {student.first_name} {student.last_name} {student.title_after}</p>
              </>
              }
            </div>
          </li>
        )
      })}
    </ul>)
};

export default bookingList;