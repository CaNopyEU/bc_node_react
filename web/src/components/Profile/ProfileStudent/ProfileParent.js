import React from 'react';

function ProfileParent(props) {
  return (
    <>
      <table>
        <thead><p>Informácie o zástupcovi</p></thead>
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
      </>
  )
}
export default ProfileParent