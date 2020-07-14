import React from "react";

import '../../pages/Profile.css'

function MyProfileStudent(props) {
  const myClass = props.classes.filter(oneClass => ( oneClass.id === props.user.classId)).map(thisClass => (
    <tr>
      <td>Žiakom triedy:</td>
      <td className="black">{thisClass.year}. {thisClass.classType}</td>
    </tr>
  ))
  return (
      <div className="is-row-evenly profile">
        <table className="my-profile-student-table">
          <tbody>
          <thead>Informácie o mne:</thead>
          <tr>
            <td>Meno:</td>
            <td className="black">{props.user.first_name}</td>
          </tr>
          <tr>
            <td>Priezvisko:</td>
            <td className="black">{props.user.last_name}</td>
          </tr>
          <tr>
            <td>Mesto:</td>
            <td className="black">{props.user.city}</td>
          </tr>
          <tr>
            <td>Ulica:</td>
            <td className="black">{props.user.street}</td>
          </tr>
          <tr>
            <td>Číslo domu:</td>
            <td className="black">{props.user.street_num}</td>
          </tr>
          <tr>
            <td>Dátum narodenia:</td>
            <td className="black">{new Date(props.user.dob).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Detail o študentovi:</td>
            <td className="black">{props.user.desc}</td>
          </tr>
          {
            myClass
          }
          </tbody>
        </table>
        <table className="my-profile-student-table">
          <thead>Informácie o mojom zástupcovi:</thead>
          <tbody>
          <tr>
            <td>Meno:</td>
            <td className="black">{props.parent.title_before} {props.parent.first_name}</td>
          </tr>
          <tr>
            <td>Priezvisko:</td>
            <td className="black">{props.parent.last_name} {props.parent.title_after}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td className="black">{props.parent.email}</td>
          </tr>
          <tr>
            <td>Dátum narodenia:</td>
            <td className="black">{new Date(props.parent.dob).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Telefónne číslo:</td>
            <td className="black">{props.parent.phone}</td>
          </tr>
          </tbody>
        </table>
      </div>
  )
}

export default MyProfileStudent