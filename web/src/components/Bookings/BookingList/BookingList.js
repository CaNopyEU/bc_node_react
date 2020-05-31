import React from "react";

import '../TeacherList/TeacherList.css';

const bookingList = props => (
    <ul className="bookings__list">
        {props.students.map(student => {
            return (
                <li key={student.id} className="bookings__item">
                    <div className="bookings__item-data">
                        {student.first_name} - {' '}
                        {new Date(student.createdAt).toLocaleDateString()}
                    </div>
                    <div className="bookings_item-actions">
                        <button className="btn" onClick={props.onDelete.bind(this, student.id)}>Zobraziť detail</button>
                    </div>
                </li>
            )
        })}
    </ul>
);

export default bookingList;