import React from "react";

function ProfileStudentView(props) {
  return (
    <>
      <table>
        <h1>Informácie o študentovi</h1>
        <tbody>
        <tr>
          <td>Meno:</td>
          <td>{props.user.first_name}</td>
        </tr>
        <tr>
          <td>Priezvisko:</td>
          <td>{props.user.last_name}</td>
        </tr>
        <tr>
          <td>Mesto:</td>
          <td>{props.user.city}</td>
        </tr>
        <tr>
          <td>Ulica:</td>
          <td>{props.user.street} / {props.user.street_num}</td>
        </tr>
        <tr>
          <td>Dátum narodenia:</td>
          <td>{new Date(props.user.dob).toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>Poznámka ku študentovi:</td>
          <td>{props.user.desc}</td>
        </tr>
        </tbody>
      </table>
      {
        !props.onlyView  &&
        <button onClick={props.editHandler} className="btn">Upraviť študenta</button>
      }
      </>
  )
}

export default ProfileStudentView