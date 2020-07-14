import React from "react";

function MyProfileTeacher(props) {

  const lectures = props.lectures.map(lecture => (
    <tr>
      <td className="black">{lecture.lecture}</td>
    </tr>
  ))

  return (
    <div className="is-row-evenly profile">
      <table className="my-profile-student-table">
        <tbody>
        <thead>Informácie o mne:</thead>
        <tr>
          <td>Meno:</td>
          <td className="black">{props.user.title_before} {props.user.first_name}</td>
        </tr>
        <tr>
          <td>Priezvisko:</td>
          <td className="black">{props.user.last_name} {props.user.title_after}</td>
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
          <td>Telefónne číslo:</td>
          <td className="black">{props.user.phone}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td className="black">{props.user.email}</td>
        </tr>
        <tr>
          <td>Dátum narodenia:</td>
          <td className="black">{new Date(props.user.dob).toLocaleDateString()}</td>
        </tr>
        {
          props.user.main_teacher === true ?
            (
              props.trieda ?
                <tr>
                  <td>Triednym učiteľom:</td>
                  <td className="black">{props.trieda.year}. {props.trieda.classType}</td>
                </tr>
                :
                <tr>
                  <td>Triednym učiteľom:</td>
                  <td className="black">Doposiaľ nebol pridelený žiadnej triede</td>
                </tr>
            )
            :
            <tr>
              <td>Triednym učiteľom:</td>
              <td className="black">Nieje triednym učiteľom</td>
            </tr>
        }
        </tbody>
      </table>

      {props.lectures ? (
        <table className="my-profile-teacher-table">
          <thead>Vyučujúcim predmetov:</thead>
          {
            lectures
          }
        </table>
      ) : (
        <table className="my-profile-teacher-table">
          <tr>
            <td className="black">Doposial neboli pridelené žiadne predmety</td>
          </tr>
        </table>)}


    </div>
  )
}

export default MyProfileTeacher