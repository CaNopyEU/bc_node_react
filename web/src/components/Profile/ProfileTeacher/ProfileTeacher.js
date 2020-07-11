import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import ProfileTeacherGroup from "./ProfileTeacherGroup";
import ProfileTeacherLecture from "./ProfileTeacherLecture";
import '../Profile.css';

function ProfileTeacher(props) {

  return (
    <div className="in-row">
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
      <tr>
        <td>Triedny učiteľ:</td>
        <td>{props.user.class.year}. {props.user.class.classType}</td>
      </tr>
      }
      </tbody>
      <ProfileTeacherGroup groups={props.user.groups} id={props.user.id}/>
      <ProfileTeacherLecture/>
    </div>
  )
}

export default ProfileTeacher;