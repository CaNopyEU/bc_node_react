import React from "react";

import '../TeacherList/TeacherList.css';

const bookingList = props => (
    <ul className="bookings__list">
        {props.students.map(student => {
            return (
                <li key={student.id} className="bookings__item">
                    {console.log('student data', student)}
                    <p>{student.first_name}  {' '}
                        {student.last_name}</p>
                    <p>
                    { (student.main_teacher) ? <>1. A</> :''}
                    </p>
                    {/*<div className="bookings_item-actions">
                        <button className="btn" onClick={props.onDelete.bind(this, student.id)}>Zobraziť detail</button>
                    </div>*/}
                </li>
            )
        })}
    </ul>
);

export default bookingList;