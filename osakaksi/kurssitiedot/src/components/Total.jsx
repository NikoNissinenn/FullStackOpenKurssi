import React from 'react';

const Total = (props) => {
  const exone = props.course.parts[0].exercises;
  const extwo = props.course.parts[1].exercises;
  const exthree = props.course.parts[2].exercises;

  return (
    <p>Number of exercises {exone+extwo+exthree}</p>
  )
}

export default Total