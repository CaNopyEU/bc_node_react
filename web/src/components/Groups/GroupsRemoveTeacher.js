import React from "react";

function GroupRemoveTeacher(props) {
  function removeGroupLecture() {
    let r = window.confirm(`Prajete si tohto učiteľa naozaj odobrať?`);
    if (r === true) {
      remove();
    }
  }

  function remove() {
    const requestBody = {
      query: `
                   mutation{
                      deleteTeacherGroup(teacherId: ${props.teacherId}, groupId: ${props.groupId}){
                        groups{
                          id
                        }
                        teachers{
                          id
                        }
                      }
                    }
                `
    };

    fetch('http://localhost:8000', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        props.remove(props.teacherId)
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <button onClick={() => removeGroupLecture()} className="btn red">Odobrať</button>
    </>
  )
}
export default GroupRemoveTeacher
