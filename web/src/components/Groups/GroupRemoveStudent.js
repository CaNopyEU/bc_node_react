import React from "react";

function GroupRemoveStudent(props) {
  function removeGroupLecture() {
    let r = window.confirm(`Prajete si tohto študenta naozaj odobrať?`);
    if (r === true) {
      remove();
    }
  }

  function remove() {
    const requestBody = {
      query: `
                  mutation{
                    deleteStudentGroup(studentId: ${props.studentId}, groupId:${props.groupId}){
                      groups {
                        id
                      }
                      students {
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
        props.remove(props.studentId)
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
export default GroupRemoveStudent
