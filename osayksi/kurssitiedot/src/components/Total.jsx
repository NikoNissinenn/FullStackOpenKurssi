import React from 'react';

const Total = (props) => {
  const exone = props.exercises1;
  const extwo = props.exercises2;
  const exthree = props.exercises3;

  return (
    <p>Number of exercises {exone+extwo+exthree}</p>
  )
}

export default Total