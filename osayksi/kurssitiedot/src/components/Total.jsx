import React from 'react';

const Total = (props) => {
  const exone = props.part1.exercises;
  const extwo = props.part2.exercises;
  const exthree = props.part3.exercises;

  return (
    <p>Number of exercises {exone+extwo+exthree}</p>
  )
}

export default Total