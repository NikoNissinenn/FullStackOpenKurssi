import React from 'react';

const Total = (props) => {
  const exone = props.parts[0].exercises;
  const extwo = props.parts[1].exercises;
  const exthree = props.parts[2].exercises;

  return (
    <p>Number of exercises {exone+extwo+exthree}</p>
  )
}

export default Total