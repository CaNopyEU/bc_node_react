import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import ProfileParent from "./ProfileParent";

function ProfileStudent(props) {
  return (
    <div className="in-row">

      <table>
        <thead><p>Informácie o študentovi</p></thead>
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
      <ProfileParent parent={props.user.parent}/>
    </div>
  )
}

export default ProfileStudent;