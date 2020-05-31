import React from "react";

import './BookingControls.css';

const BookingControls = props => {

    return (
        <div className="bookings-control">
            <button
                className={props.activeOutputType === 'students' ? 'active' : ''}
                onClick={props.onChange.bind(this, 'students')}
            >
                Zoznam študentov
            </button>
            <button
                className={props.activeOutputType === 'teachers' ? 'active' : ''}
                onClick={props.onChange.bind(this, 'teachers')}
            >
                Zoznam učiteľov
            </button>
        </div>
    )
}

export default BookingControls;