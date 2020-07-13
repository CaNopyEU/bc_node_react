import React from "react";

function GroupRemoveLecture(props) {

  function removeGroupLecture() {
    let r = window.confirm(`Prajete si tento predmet naozaj odobrať?`);
    if (r === true) {
      remove();
    }
  }

  function remove() {
    const requestBody = {
      query: `
                    mutation{
                      deleteGroupLecture(groupId: ${props.groupId},lectureId: ${props.lectureId})
                      {
                        groups {
                          id
                        }
                        lectures{
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
        props.remove(props.lectureId)
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
export default GroupRemoveLecture
