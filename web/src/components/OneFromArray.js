import React from "react";

function oneFromArray(array, id) {
  return array.filter(one => one.id === id);
}

export default oneFromArray;