import React from "react";

function GradesView(props) {


  return (
    <>
    <div className="auth-form grades-row">
      {props.grades.map(grade => (
        <button onClick={() => props.delete(grade.id)} className="btn grades-btn">{grade.grade}</button>
      ))}
      </div>
      </>
  )
}

export default GradesView