import React, {useEffect, useState} from "react";
import './Homework.css';
import oneFromArray from "../OneFromArray";

function HomeworkView(props) {


  return (
    <div className="homework-body-view">
      <h1>Domáce úlohy:</h1>
      {props.homeworks.map( hw => (
        <div className="homework-body-view-item-block" >

          {console.log('one arra',oneFromArray(props.lectures, hw.lectureId)[0])}
          <div className="homework-body-view-item">
          <div className="row"><p>Názov:</p><p>{hw.name}</p></div>
          <div className="row"><p>Detail:</p><p>{hw.desc}</p></div>
          <div className="row"><p>Dead-line:</p><p>{new Date(hw.deadline).toLocaleDateString()}</p></div>
          </div>
          {oneFromArray(props.teachers, hw.teacherId)[0].id === props.myId &&
          <button onClick={() => props.onDelete(hw.id)} className="btn red">Zmazať</button>
          }
        </div>
      ))}
    </div>
  )
}

export default HomeworkView