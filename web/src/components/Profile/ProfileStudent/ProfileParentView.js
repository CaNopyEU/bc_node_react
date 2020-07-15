import React from "react";

function ProfileParentView(props) {
  return (
    <>
      <table className="in-column">
        <p>Informácie o zástupcovi</p>
        <tbody>
        <tr>
          <td>Meno a priezvisko:</td>
          <td>{props.parent.title_before} {props.parent.first_name} {props.parent.last_name} {props.parent.title_after}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{props.parent.email}</td>
        </tr>
        <tr>
          <td>Dátum narodenia:</td>
          <td>{new Date(props.parent.dob).toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>Telefónne číslo:</td>
          <td>{props.parent.phone}</td>
        </tr>
        </tbody>
      </table>
      {
        !props.onlyView &&
        <button onClick={props.editHandler} className="btn">Upraviť zástupcu</button>
      }

    </>
  )
}

export default ProfileParentView