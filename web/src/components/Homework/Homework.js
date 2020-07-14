import React, {useEffect, useState} from "react";
import HomeworkView from "./HomeworkView";
import HomeworkAdd from "./HomeworksAdd";
import oneFromArray from "../OneFromArray";

function Homework(props) {

  return (
    <div className="homework-body">
      <HomeworkView onDelete={props.onDelete} myId={props.myId} homeworks={props.homeworks} lectures={props.lectures} teachers={props.teachers}/>
      {oneFromArray(props.teachers, props.myId).length > 0 &&
      <HomeworkAdd myId={props.myId} skupina={props.skupina} lectures={props.lectures} teachers={props.teachers}/>
      }
    </div>
  )
}

export default Homework