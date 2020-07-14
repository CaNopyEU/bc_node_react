import React from "react";

function ProfileTeacherView(props) {
  return (
    <>
      <table className="in-column-profile-teacher">
        <tr>
          <td>Meno:</td>
          <td>{props.user.first_name}</td>
        </tr>
        <tr>
          <td>Priezvisko:</td>
          <td>{props.user.last_name}</td>
        </tr>
        <tr>
          <td>Titul pred menom:</td>
          <td>{props.user.title_before}</td>
        </tr>
        <tr>
          <td>Titul za menom:</td>
          <td>{props.user.title_after}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{props.user.email}</td>
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
          <td>Tel. číslo:</td>
          <td>{props.user.phone}</td>
        </tr>
        <tr>
          <td>Dátum narodenia:</td>
          <td>{new Date(props.user.dob).toLocaleDateString()}</td>
        </tr>
        {props.user.main_teacher &&
        props.user.class ?
          <tr>
            <td>Triedny učiteľ:</td>
            <td>{props.user.class.year}. {props.user.class.classType}</td>
          </tr> :
          <tr>
            <td>Doposiaľ nebol priradený ku žiadnej triede.</td>
            <td></td>
          </tr>
        }
        <button onClick={props.editHandler} className="btn">Upraviť učiteľa</button>
      </table>
    </>
  )
}

export default ProfileTeacherView